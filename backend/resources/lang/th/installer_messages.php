<?php

return array (
  'title' => 'ตัวติดตั้ง Laravel',
  'next' => 'ขั้นตอนถัดไป',
  'back' => 'ก่อนหน้า',
  'finish' => 'ติดตั้ง',
  'forms' => 
  array (
    'errorTitle' => 'ข้อผิดพลาดดังต่อไปนี้เกิดขึ้น:',
  ),
  'welcome' => 
  array (
    'templateTitle' => 'ยินดีต้อนรับ',
    'title' => 'ตัวติดตั้ง Laravel',
    'message' => 'เครื่องมือการติดตั้งและตั้งค่าที่ง่าย.',
    'next' => 'ตรวจสอบข้อกำหนด',
  ),
  'requirements' => 
  array (
    'templateTitle' => 'ขั้นตอนที่ 1 | ข้อกำหนดของเซิร์ฟเวอร์',
    'title' => 'ข้อกำหนดของเซิร์ฟเวอร์',
    'next' => 'ตรวจสอบสิทธิ์',
  ),
  'permissions' => 
  array (
    'templateTitle' => 'ขั้นตอนที่ 2 | สิทธิ์',
    'title' => 'สิทธิ์',
    'next' => 'กำหนดค่าความเป็นมิตร',
  ),
  'environment' => 
  array (
    'menu' => 
    array (
      'templateTitle' => 'ขั้นตอนที่ 3 | การตั้งค่าสภาพแวดล้อม',
      'title' => 'การตั้งค่าสภาพแวดล้อม',
      'desc' => 'กรุณาเลือกวิธีที่คุณต้องการกำหนดค่าไฟล์ <code>.env</code> ของแอป.',
      'wizard-button' => 'การตั้งค่าแบบฟอร์ม Wizard',
      'classic-button' => 'ตัวแก้ไขข้อความคลาสสิก',
    ),
    'wizard' => 
    array (
      'templateTitle' => 'ขั้นตอนที่ 3 | การตั้งค่าสภาพแวดล้อม | Wizard ที่แนะนำ',
      'title' => 'Wizard <code>.env</code> ที่แนะนำ',
      'tabs' => 
      array (
        'environment' => 'สภาพแวดล้อม',
        'database' => 'ฐานข้อมูล',
        'application' => 'แอปพลิเคชัน',
      ),
      'form' => 
      array (
        'name_required' => 'ต้องการชื่อสภาพแวดล้อม.',
        'app_name_label' => 'ชื่อแอป',
        'app_name_placeholder' => 'ชื่อแอป',
        'app_environment_label' => 'สภาพแวดล้อมของแอป',
        'app_environment_label_local' => 'ท้องถิ่น',
        'app_environment_label_developement' => 'การพัฒนา',
        'app_environment_label_qa' => 'การตรวจสอบคุณภาพ',
        'app_environment_label_production' => 'การผลิต',
        'app_environment_label_other' => 'อื่น ๆ',
        'app_environment_placeholder_other' => 'กรุณาใส่สภาพแวดล้อมของคุณ...',
        'app_debug_label' => 'การดีบักแอป',
        'app_debug_label_true' => 'จริง',
        'app_debug_label_false' => 'เท็จ',
        'app_log_level_label' => 'ระดับการบันทึกแอป',
        'app_log_level_label_debug' => 'debug',
        'app_log_level_label_info' => 'info',
        'app_log_level_label_notice' => 'notice',
        'app_log_level_label_warning' => 'warning',
        'app_log_level_label_error' => 'error',
        'app_log_level_label_critical' => 'critical',
        'app_log_level_label_alert' => 'alert',
        'app_log_level_label_emergency' => 'emergency',
        'app_url_label' => 'URL ของแอป',
        'app_url_placeholder' => 'URL ของแอป',
        'db_connection_failed' => 'ไม่สามารถเชื่อมต่อกับฐานข้อมูล.',
        'db_connection_label' => 'การเชื่อมต่อฐานข้อมูล',
        'db_connection_label_mysql' => 'mysql',
        'db_connection_label_sqlite' => 'sqlite',
        'db_connection_label_pgsql' => 'pgsql',
        'db_connection_label_sqlsrv' => 'sqlsrv',
        'db_host_label' => 'โฮสต์ฐานข้อมูล',
        'db_host_placeholder' => 'โฮสต์ฐานข้อมูล',
        'db_port_label' => 'พอร์ตฐานข้อมูล',
        'db_port_placeholder' => 'พอร์ตฐานข้อมูล',
        'db_name_label' => 'ชื่อฐานข้อมูล',
        'db_name_placeholder' => 'ชื่อฐานข้อมูล',
        'db_username_label' => 'ชื่อผู้ใช้ฐานข้อมูล',
        'db_username_placeholder' => 'ชื่อผู้ใช้ฐานข้อมูล',
        'db_password_label' => 'รหัสผ่านฐานข้อมูล',
        'db_password_placeholder' => 'รหัสผ่านฐานข้อมูล',
        'app_tabs' => 
        array (
          'more_info' => 'ข้อมูลเพิ่มเติม',
          'broadcasting_title' => 'การออกอากาศ, การแคช, เซสชัน, &amp; คิว',
          'broadcasting_label' => 'ไดรเวอร์การออกอากาศ',
          'broadcasting_placeholder' => 'ไดรเวอร์การออกอากาศ',
          'cache_label' => 'ไดรเวอร์แคช',
          'cache_placeholder' => 'ไดรเวอร์แคช',
          'session_label' => 'ไดรเวอร์เซสชัน',
          'session_placeholder' => 'ไดรเวอร์เซสชัน',
          'queue_label' => 'ไดรเวอร์คิว',
          'queue_placeholder' => 'ไดรเวอร์คิว',
          'redis_label' => 'ไดรเวอร์ Redis',
          'redis_host' => 'โฮสต์ Redis',
          'redis_password' => 'รหัสผ่าน Redis',
          'redis_port' => 'พอร์ต Redis',
          'mail_label' => 'อีเมล',
          'mail_driver_label' => 'ไดรเวอร์อีเมล',
          'mail_driver_placeholder' => 'ไดรเวอร์อีเมล',
          'mail_host_label' => 'โฮสต์อีเมล',
          'mail_host_placeholder' => 'โฮสต์อีเมล',
          'mail_port_label' => 'พอร์ตอีเมล',
          'mail_port_placeholder' => 'พอร์ตอีเมล',
          'mail_username_label' => 'ชื่อผู้ใช้อีเมล',
          'mail_username_placeholder' => 'ชื่อผู้ใช้อีเมล',
          'mail_password_label' => 'รหัสผ่านอีเมล',
          'mail_password_placeholder' => 'รหัสผ่านอีเมล',
          'mail_encryption_label' => 'การเข้ารหัสอีเมล',
          'mail_encryption_placeholder' => 'การเข้ารหัสอีเมล',
          'pusher_label' => 'Pusher',
          'pusher_app_id_label' => 'Pusher App Id',
          'pusher_app_id_palceholder' => 'Pusher App Id',
          'pusher_app_key_label' => 'Pusher App Key',
          'pusher_app_key_palceholder' => 'Pusher App Key',
          'pusher_app_secret_label' => 'Pusher App Secret',
          'pusher_app_secret_palceholder' => 'Pusher App Secret',
        ),
        'buttons' => 
        array (
          'setup_database' => 'ตั้งค่าฐานข้อมูล',
          'setup_application' => 'ตั้งค่าแอปพลิเคชัน',
          'install' => 'ติดตั้ง',
        ),
      ),
    ),
    'classic' => 
    array (
      'templateTitle' => 'ขั้นตอนที่ 3 | การตั้งค่าสภาพแวดล้อม | ตัวแก้ไขคลาสสิก',
      'title' => 'ตัวแก้ไขสภาพแวดล้อมแบบคลาสสิก',
      'save' => 'บันทึก .env',
      'back' => 'ใช้ตัวติดตั้งฟอร์ม',
      'install' => 'บันทึกและติดตั้ง',
    ),
    'success' => 'การตั้งค่าไฟล์ .env ของคุณถูกบันทึกแล้ว.',
    'errors' => 'ไม่สามารถบันทึกไฟล์ .env ได้, กรุณาสร้างไฟล์นี้ด้วยตนเอง.',
  ),
  'install' => 'ติดตั้ง',
  'installed' => 
  array (
    'success_log_message' => 'ตัวติดตั้ง Laravel ติดตั้งสำเร็จแล้วใน ',
  ),
  'final' => 
  array (
    'title' => 'การติดตั้งเสร็จสมบูรณ์',
    'templateTitle' => 'การติดตั้งเสร็จสมบูรณ์',
    'finished' => 'แอปพลิเคชันถูกติดตั้งเรียบร้อยแล้ว.',
    'migration' => 'เอาต์พุตคอนโซลการย้ายข้อมูล &amp; เมล็ดพันธุ์:',
    'console' => 'เอาต์พุตคอนโซลของแอปพลิเคชัน:',
    'log' => 'รายการบันทึกการติดตั้ง:',
    'env' => 'ไฟล์ .env สุดท้าย:',
    'exit' => 'คลิกที่นี่เพื่อออก',
  ),
  'updater' => 
  array (
    'title' => 'ตัวอัปเดต Laravel',
    'welcome' => 
    array (
      'title' => 'ยินดีต้อนรับสู่ตัวอัปเดต',
      'message' => 'ยินดีต้อนรับสู่เครื่องมืออัปเดต.',
    ),
    'overview' => 
    array (
      'title' => 'ภาพรวม',
      'message' => 'มีการอัปเดต 1 รายการ.|มีการอัปเดต :number รายการ.',
      'install_updates' => 'ติดตั้งการอัปเดต',
    ),
    'final' => 
    array (
      'title' => 'เสร็จสิ้น',
      'finished' => 'ฐานข้อมูลของแอปพลิเคชันได้รับการอัปเดตเรียบร้อยแล้ว.',
      'exit' => 'คลิกที่นี่เพื่อออก',
    ),
    'log' => 
    array (
      'success_message' => 'ตัวติดตั้ง Laravel ได้รับการอัปเดตสำเร็จแล้วใน ',
    ),
  ),
);
