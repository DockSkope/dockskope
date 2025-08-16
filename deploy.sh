#!/bin/bash

# DockScope Website Deployment Script
# This script helps deploy the website to various platforms

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to validate website files
validate_files() {
    print_status "Validating website files..."
    
    required_files=("index.html" "styles.css" "script.js" "assets/logo.svg" "assets/favicon.svg")
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            print_error "Missing required file: $file"
            exit 1
        fi
    done
    
    print_success "All required files found!"
}

# Function to optimize for production
optimize_for_production() {
    print_status "Optimizing for production..."
    
    # Create dist directory
    mkdir -p dist
    
    # Copy files to dist
    cp -r index.html styles.css script.js assets dist/
    
    # Optional: Minify CSS and JS (requires additional tools)
    if command_exists "uglifyjs"; then
        print_status "Minifying JavaScript..."
        uglifyjs dist/script.js -o dist/script.min.js
        mv dist/script.min.js dist/script.js
    fi
    
    if command_exists "cleancss"; then
        print_status "Minifying CSS..."
        cleancss -o dist/styles.min.css dist/styles.css
        mv dist/styles.min.css dist/styles.css
    fi
    
    print_success "Production build created in dist/ directory!"
}

# Function to deploy to local server
deploy_local() {
    print_status "Starting local development server..."
    
    if command_exists "python3"; then
        print_status "Using Python 3 server..."
        cd dist || cd .
        python3 -m http.server 8000
    elif command_exists "python"; then
        print_status "Using Python server..."
        cd dist || cd .
        python -m http.server 8000
    elif command_exists "php"; then
        print_status "Using PHP server..."
        cd dist || cd .
        php -S localhost:8000
    elif command_exists "node"; then
        print_status "Using Node.js http-server..."
        npx http-server dist -p 8000
    else
        print_error "No suitable local server found. Please install Python, PHP, or Node.js."
        exit 1
    fi
}

# Function to deploy to GitHub Pages
deploy_github_pages() {
    print_status "Deploying to GitHub Pages..."
    
    if ! command_exists "git"; then
        print_error "Git is required for GitHub Pages deployment"
        exit 1
    fi
    
    # Check if we're in a git repository
    if [[ ! -d ".git" ]]; then
        print_error "Not in a git repository. Please initialize git first."
        exit 1
    fi
    
    # Create gh-pages branch
    git checkout -b gh-pages 2>/dev/null || git checkout gh-pages
    
    # Copy files to root
    cp -r dist/* . 2>/dev/null || cp -r * .
    
    # Add and commit
    git add .
    git commit -m "Deploy website to GitHub Pages" || true
    
    # Push to GitHub
    git push origin gh-pages
    
    print_success "Deployed to GitHub Pages! Check your repository settings to enable GitHub Pages."
}

# Function to deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if ! command_exists "netlify"; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    # Deploy to Netlify
    netlify deploy --dir=dist --prod
    
    print_success "Deployed to Netlify!"
}

# Function to deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command_exists "vercel"; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    cd dist || cd .
    vercel --prod
    
    print_success "Deployed to Vercel!"
}

# Function to deploy to traditional web server
deploy_server() {
    local server_host="$1"
    local server_path="$2"
    local server_user="$3"
    
    if [[ -z "$server_host" || -z "$server_path" ]]; then
        print_error "Server host and path are required"
        echo "Usage: $0 server <host> <path> [user]"
        exit 1
    fi
    
    print_status "Deploying to server: $server_host:$server_path"
    
    # Create deployment package
    tar -czf dockscope-website.tar.gz -C dist .
    
    # Upload to server
    if [[ -n "$server_user" ]]; then
        scp dockscope-website.tar.gz "$server_user@$server_host:/tmp/"
        ssh "$server_user@$server_host" "cd $server_path && tar -xzf /tmp/dockscope-website.tar.gz && rm /tmp/dockscope-website.tar.gz"
    else
        scp dockscope-website.tar.gz "$server_host:/tmp/"
        ssh "$server_host" "cd $server_path && tar -xzf /tmp/dockscope-website.tar.gz && rm /tmp/dockscope-website.tar.gz"
    fi
    
    # Clean up
    rm dockscope-website.tar.gz
    
    print_success "Deployed to server successfully!"
}

# Function to show help
show_help() {
    echo "🐳 DockScope Website Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  validate              Validate website files"
    echo "  build                 Build production version"
    echo "  local                 Start local development server"
    echo "  github                Deploy to GitHub Pages"
    echo "  netlify               Deploy to Netlify"
    echo "  vercel                Deploy to Vercel"
    echo "  server <host> <path>  Deploy to traditional web server"
    echo "  help                  Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 validate"
    echo "  $0 build"
    echo "  $0 local"
    echo "  $0 github"
    echo "  $0 netlify"
    echo "  $0 vercel"
    echo "  $0 server example.com /var/www/html"
    echo "  $0 server example.com /var/www/html user"
    echo ""
}

# Main script logic
case "${1:-help}" in
    "validate")
        validate_files
        ;;
    "build")
        validate_files
        optimize_for_production
        ;;
    "local")
        validate_files
        optimize_for_production
        deploy_local
        ;;
    "github")
        validate_files
        optimize_for_production
        deploy_github_pages
        ;;
    "netlify")
        validate_files
        optimize_for_production
        deploy_netlify
        ;;
    "vercel")
        validate_files
        optimize_for_production
        deploy_vercel
        ;;
    "server")
        validate_files
        optimize_for_production
        deploy_server "$2" "$3" "$4"
        ;;
    "help"|*)
        show_help
        ;;
esac 