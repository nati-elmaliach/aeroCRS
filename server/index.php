<script>
  <?php
  if ($_SERVER['PATH_INFO'] == "/") {
    echo file_get_contents('app.js');
  }
  ?>
</script>
<?php


$GLOBALS['jsonFile'] = "pixels.json";


function jsonFileExists()
{
  return file_exists($GLOBALS['jsonFile']);
}

function getNextId($currentPixelsArray)
{
  $lastPixel = end(array_values($currentPixelsArray));
  return $lastPixel->id + 1;

  /*
  Desperate try to calculate the new id, but thats not correct either.
  Im leaving the code here, but note that i wrote the solution inside the README.md
  */

  $lastId =  (string)$lastPixel->id;
  $lastIdreversed = strrev($lastId);

  $digits_array = str_split($lastIdreversed);
  foreach ($digits_array as $index => $digit) {
    $numDigit = (int)$digit;
    if ($numDigit < 9) {
      $digits_array[$index] = $numDigit + 1;
      break;
    }
  }

  $newIdStringReversed = implode("", $digits_array);
  return (int)strrev($newIdStringReversed);
}
// This is our router.
function router()
{

  if ($_SERVER['PATH_INFO'] == "/") {
    // Delete the current json file if exists
    if (jsonFileExists()) {
      unlink($GLOBALS['jsonFile']);
    }

    // On load, start the program
    echo '<script>init();</script>';

    return;
  }

  if ($_SERVER['PATH_INFO'] == "/api/pixel") {
    $jsonData = file_get_contents("php://input");
    $jsonDataDecoded = json_decode($jsonData);
    if (jsonFileExists()) {
      $inp = file_get_contents($GLOBALS['jsonFile']);
      $currentPixelsArray = json_decode($inp);
      $jsonDataDecoded->id = getNextId($currentPixelsArray);
      array_push($currentPixelsArray, $jsonDataDecoded);
      file_put_contents($GLOBALS['jsonFile'], json_encode($currentPixelsArray));
    } else {
      $jsonDataDecoded->id = 100000000; // Set the first id manually
      $newPixelsArray = array();
      array_push($newPixelsArray, $jsonDataDecoded);
      file_put_contents($GLOBALS['jsonFile'], json_encode($newPixelsArray));
    }

    return;
  }



  // This can only be reached if none of the routes matched the path.
  echo 'Sorry! Page not found';
}

// Execute the router with our list of routes.
router();
