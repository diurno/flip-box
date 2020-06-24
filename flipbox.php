<?php

/**
  Plugin Name: Flip Box Block Component
  Description: FlipBox  is a plugin that allowed to you create flip cards on your theme
  Author: Federico Cadierno
  Version: 1.6.0
  Text Domain: anti-spam
  License: GPLv3
 */

function fbbc_load_files() {
  wp_enqueue_script(
    'my-super-unique-handle',
    plugin_dir_url(__FILE__) . 'flipbox-block.js',
    array('wp-blocks', 'wp-i18n', 'wp-editor'),
    true
  );
  wp_enqueue_style( 'flip-style', plugin_dir_url(__FILE__).'flipbox.css' );

}
 
add_action('enqueue_block_editor_assets', 'fbbc_load_files');


function fbbc_load_front_end_styles() {
	wp_enqueue_style( 'frontend_style',plugin_dir_url( __FILE__ ).'css/flipbox-frontend.css' );
}
 
add_action('wp_enqueue_scripts', 'fbbc_load_front_end_styles');