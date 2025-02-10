# Use the latest Nginx image
FROM nginx:latest

# Remove the default nginx.conf to use your own configuration
RUN rm /etc/nginx/nginx.conf

# Copy custom nginx.conf from your local nginx folder to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to make it accessible
EXPOSE 80

# Start Nginx in the foreground (important for container lifecycle)
CMD ["nginx", "-g", "daemon off;"]
