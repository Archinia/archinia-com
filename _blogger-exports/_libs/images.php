<?php
$dir = __DIR__ . '/rachel-preston-prinz';
$csvname = $dir . '/_blogger_export-links_rpp.csv';
$csv = fopen($csvname, 'r');

$filenames = [];

$extensions = [
  'jpg',
  'png',
  'jpeg',
  'gif'
];

$keys = [];
$replacements = ['orig' => [], 'new' => []];

while($filename = fgets($csv)) {
  $filename = trim($filename);
  $filename = trim($filename, ')');

  $parts = explode('.', $filename);
  $extension = array_pop($parts);
  $extension = str_replace(')', '', $extension);
  $extension = strtolower($extension);

  if(!in_array($extension, $extensions)) continue;

  // echo "$filename\n";
  $p2 = explode('/', $filename);

  if(sizeof($p2) !== 9) continue;

  $download = implode('/', array_slice($p2, 0, 7)) . '/s1600/';
  $name = $p2[8];
  $key = $p2[6];
  $newFilename = __DIR__ . '/../images/blog/legacy/' . str_replace(['(', ')'], ['\(', '\)'], basename($filename));

  if(!in_array($key, $keys) && !file_exists($newFilename)) {
    echo "$download\n";
    exec("curl -o $newFilename $download");
  };
  $keys[] = $key;

  // echo $filename . ',' . implode(',', $p2) . "\n";
  $replacements['orig'][] = $filename;
  $replacements['new'][] = "/images/blog/legacy/$name";
}

$files = get_md_files($dir);

foreach($files as $file) {
  replace_images($replacements['orig'], $replacements['new'], $file);
}

function replace_images($original, $new, $file) {
  $linked = array_map(function ($url) {
    return "[![]($url)]";
  }, $original);

  $str = file_get_contents($file);
  $str = str_replace($linked, '![]', $str);
  $str = str_replace($original, $new, $str);
  file_put_contents($file, $str);
}

function get_md_files($dir) {
  // Check if the directory exists
  if (file_exists($dir) && is_dir($dir) ) {
    $files = [];

    // Get the files of the directory as an array
    $scan_arr = scandir($dir);
    $files_arr = array_diff($scan_arr, array('.','..') );
    // echo "<pre>"; print_r( $files_arr ); echo "</pre>";
    // Get each files of our directory with line break
    foreach ($files_arr as $file) {
      //Get the file path
      $file_path = $dir.'/'.$file;
      // Get the file extension
      $file_ext = pathinfo($file_path, PATHINFO_EXTENSION);
      if ($file_ext=="md") {
        $files[] = $dir.'/'.$file;
      }

    }
    return $files;
  }
  else {
    echo "Directory does not exist";
  }
}
