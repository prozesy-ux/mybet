$f = "c:\Users\mpro\Desktop\1win\src\sections\Sidebar\components\SidebarMenuSection.tsx"
$lines = [System.IO.File]::ReadAllLines($f)

# Add import at top if not present
$hasImport = $lines | Where-Object { $_ -match 'import \{ Link \}' }
if (-not $hasImport) {
  $lines = @('import { Link } from "react-router-dom";', '') + $lines
}

# For each SVG name, find its line, walk back to find <a, replace with <Link + route,
# then walk forward to find </a> and replace with </Link>
$targets = @(
  @{ svg = 'blog.svg';        route = '/blog'  },
  @{ svg = 'bonuses-v2.svg';  route = '/bonus' },
  @{ svg = 'vip-landing.svg'; route = '/vip'   }
)

foreach ($t in $targets) {
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match [regex]::Escape($t.svg)) {
      # Walk back to find <a
      for ($k = $i; $k -ge [Math]::Max(0, $i-15); $k--) {
        if ($lines[$k] -match '^\s+<a\s*$') {
          $lines[$k] = $lines[$k] -replace '<a\s*$', '<Link'
          # Next line should be href="#" — replace with to="route"
          if ($lines[$k+1] -match 'href="#"') {
            $lines[$k+1] = $lines[$k+1] -replace 'href="#"', ('to="' + $t.route + '"')
          }
          break
        }
      }
      # Walk forward to find </a>
      for ($k = $i; $k -lt [Math]::Min($lines.Count, $i+25); $k++) {
        if ($lines[$k] -match '^\s+</a>\s*$') {
          $lines[$k] = $lines[$k] -replace '</a>', '</Link>'
          break
        }
      }
      break
    }
  }
}

[System.IO.File]::WriteAllLines($f, $lines)
Write-Host "Done."
$verify = [System.IO.File]::ReadAllText($f)
Write-Host "/blog:  $($verify -match 'to="\/blog"')"
Write-Host "/bonus: $($verify -match 'to="\/bonus"')"
Write-Host "/vip:   $($verify -match 'to="\/vip"')"
Write-Host "Link import: $($verify -match 'import \{ Link \}')"
