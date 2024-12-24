<?php
/**
 * Plugin Name: Gutenberg Layout Blocks
 * Description: Custom layout blocks for the Gutenberg editor
 * Version: 1.0.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) {
    exit;
}

function gutenberg_layout_blocks_register() {
    wp_register_script(
        'gutenberg-layout-blocks',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
    );

    wp_register_style(
        'gutenberg-layout-blocks-editor',
        plugins_url('build/index.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );

    register_block_type('gutenberg-layout-blocks/container', array(
        'editor_script' => 'gutenberg-layout-blocks',
        'editor_style' => 'gutenberg-layout-blocks-editor',
    ));

    register_block_type('gutenberg-layout-blocks/row', array(
        'editor_script' => 'gutenberg-layout-blocks',
        'editor_style' => 'gutenberg-layout-blocks-editor',
    ));

    register_block_type('gutenberg-layout-blocks/column', array(
        'editor_script' => 'gutenberg-layout-blocks',
        'editor_style' => 'gutenberg-layout-blocks-editor',
    ));
}

add_action('init', 'gutenberg_layout_blocks_register');