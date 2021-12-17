<?php
header('Content-type: application/json');

// First, let's define our list of routes.
// We could put this in a different file and include it in order to separate
// logic and configuration.
$routes = array(
  '/'      => 'Welcome! This is the main page.',
  '/hello' => 'Hello, World!',
  '/users' => 'Users!'
);

// This is our router.
function router($routes)
{
  // Iterate through a given list of routes.
  foreach ($routes as $path => $content) {
    if ($path == $_SERVER['PATH_INFO']) {
      // If the path matches, display its contents and stop the router.
      $data = ['name' => 'Nati', 'age' => 1];
      echo json_encode($data);

      return;
    }
  }

  // This can only be reached if none of the routes matched the path.
  echo 'Sorry! Page not found';
}

// Execute the router with our list of routes.
router($routes);
