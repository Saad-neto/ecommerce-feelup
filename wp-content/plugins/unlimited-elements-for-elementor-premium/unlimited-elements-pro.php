<?php

/*
Plugin Name: Unlimited Elements for Elementor (Premium)
Plugin URI: http://unlimited-elements.com
Description: Unlimited Elements Pro - Huge Widgets Pack for Elementor Page Builder, with html/css/js widget creator and editor
Author: Unlimited Elements
Version: 1.5.129
Update URI: https://api.freemius.com
Author URI: http://unlimited-elements.com
Text Domain: unlimited-elements-for-elementor
Domain Path: /languages

* Tested up to: 6.7
* Elementor tested up to: 3.25.7
* Elementor Pro tested up to: 3.25.3
*/
class uepFsNull {
public function is_paying() {
return true;
}
public function can_use_premium_code() {
return true;
}
public function can_use_premium_code__premium_only() {
return true;
}
}
if ( !defined( "UNLIMITED_ELEMENTS_INC" ) ) {
    define( "UNLIMITED_ELEMENTS_INC", true );
}
if ( !function_exists( 'uefe_fs' ) ) {
    // Create a helper function for easy SDK access.
    function uefe_fs() {
        global $uefe_fs;
        if ( !isset( $uefe_fs ) ) {
           $uefe_fs = new uepFsNull();
        }
        return $uefe_fs;
    }

    // Init Freemius.
    uefe_fs();
    // Signal that SDK was initiated.
    do_action( 'uefe_fs_loaded' );
}
$mainFilepath = __FILE__;
$currentFolder = dirname( $mainFilepath );
$pathProvider = $currentFolder . "/provider/";
try {
    if ( class_exists( "GlobalsUC" ) ) {
        define( "UC_BOTH_VERSIONS_ACTIVE", true );
    } else {
        $pathAltLoader = $pathProvider . "provider_alt_loader.php";
        if ( file_exists( $pathAltLoader ) ) {
            require $pathAltLoader;
        } else {
            require_once $currentFolder . '/includes.php';
            require_once GlobalsUC::$pathProvider . "core/provider_main_file.php";
        }
    }
} catch ( Exception $e ) {
    $message = $e->getMessage();
    $trace = $e->getTraceAsString();
    echo "<br>";
    echo esc_html( $message );
    echo "<pre>";
    print_r( $trace );
}