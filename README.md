<div class="container">
        <h2>Warehouse Management System Backend</h2>
        <p>This documentation provides an overview of the backend API for our application, including setup instructions, environment variables, authentication, and available routes.</p>
        <h2>Setup and Installation</h2>
        <h3>Prerequisites</h3>
        <ul>
            <li>Node.js</li>
            <li>ExpressJS</li>
            <li>npm</li>
            <li>MongoDB</li>
        </ul>
        <h3>Installation</h3>
        <p>Clone the repository:</p>
        <pre><code>git clone 'repository'
cd your-repo-name</code></pre>
        <p>Install dependencies:</p>
        <pre><code>npm install
# or
yarn install</code></pre>
        <p>Create a <code>.env</code> file in the root directory and add the necessary environment variables (see Environment Variables).</p>
        <p>Start the server:</p>
        <pre><code>npm run dev
# or
yarn run dev</code></pre>
        <h2>Environment Variables</h2>
        <p>Create a <code>.env</code> file in the root directory with the following variables:</p>
        <pre><code>PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret</code></pre>
        <h2>Authentication</h2>
        <h3>JSON Web Tokens (JWT)</h3>
        <p>Authentication is handled using JWT. Include the token in the <code>x-auth-token</code> header for all protected routes.</p>
    </div>
