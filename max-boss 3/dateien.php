<?php
// Gibt die Bilder eines Ordners in img/ als Liste zurück (für Hostpoint).
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
$erlaubt = ['anderes', 'Auto', 'drohne', 'Haus', 'Produkt'];
$ordner = isset($_GET['ordner']) ? basename($_GET['ordner']) : '';
if (!in_array($ordner, $erlaubt, true)) { http_response_code(400); echo '[]'; exit; }
$pfad = __DIR__ . '/img/' . $ordner;
$dateien = [];
if (is_dir($pfad)) {
  foreach (scandir($pfad) as $f) {
    if ($f[0] !== '.' && preg_match('/\.(jpe?g|png|webp|gif|avif)$/i', $f)) $dateien[] = $f;
  }
}
natcasesort($dateien);
echo json_encode(array_values($dateien), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
