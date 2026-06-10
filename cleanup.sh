#!/usr/bin/env bash
# cleanup.sh — run from the root of the datadogrumforpirates.github.io repo
set -e

echo "🧹 Starting site cleanup..."

# ─────────────────────────────────────────────
# 1. Add .gitignore
# ─────────────────────────────────────────────
cat > .gitignore << 'EOF'
# macOS
.DS_Store
**/.DS_Store
__MACOSX/

# Editor
.vscode/
*.swp
EOF
echo "✅ .gitignore created"

# ─────────────────────────────────────────────
# 2. Remove committed .DS_Store files
# ─────────────────────────────────────────────
git rm --cached -r --ignore-unmatch "**/.DS_Store" ".DS_Store" 2>/dev/null || true
echo "✅ .DS_Store files removed from git tracking"

# ─────────────────────────────────────────────
# 3. Fix test/index.html
#    - Remove the malformed nested <html><head> block mid-document
#    - Remove the // comment inside the JS config object
#    - Add alt attribute to profile img
# ─────────────────────────────────────────────
python3 << 'PYEOF'
import re

with open("test/index.html", "r") as f:
    content = f.read()

# Remove the stray nested <html><head>...</head></html> block that wraps
# only the DD Logs snippet (it appears between </script> and </head>)
content = re.sub(
    r'\s*<!-- Datadog Logs Initialization -->\s*<html>\s*<head>\s*'
    r'(<script[^>]*src="[^"]*datadog-logs[^"]*"[^>]*></script>\s*'
    r'<script>.*?</script>)\s*</head>\s*</html>',
    r'\n  <!-- Datadog Logs Initialization -->\n  \1',
    content,
    flags=re.DOTALL
)

# Remove the // commented-out line inside the JS object literal
content = re.sub(r'\s*//allowFallbackToLocalStorage:[^\n]+\n', '\n', content)

# Add alt to profile img if missing
content = re.sub(
    r'(<img src="/img/profile-pic\.jpg") (alt="" )',
    r'\1 alt="Captain\'s Profile Pic" ',
    content
)

with open("test/index.html", "w") as f:
    f.write(content)

print("✅ test/index.html fixed")
PYEOF

# ─────────────────────────────────────────────
# 4. Fix rumresources/index.html
#    - Add missing window.DD_RUM && guard on setGlobalContextProperty('client_time')
#    - Remove redundant inline style on hero-container
# ─────────────────────────────────────────────
python3 << 'PYEOF'
with open("rumresources/index.html", "r") as f:
    content = f.read()

# Fix missing guard: bare window.DD_RUM.setGlobalContextProperty('client_time'
content = content.replace(
    "      window.DD_RUM.setGlobalContextProperty('client_time', {",
    "    window.DD_RUM && window.DD_RUM.setGlobalContextProperty('client_time', {"
)

# Remove redundant inline style (already handled by .rum-resources CSS)
content = content.replace(
    ' style="margin-left: 300px; padding: 0 2rem; width: 100%;"',
    ''
)

with open("rumresources/index.html", "w") as f:
    f.write(content)

print("✅ rumresources/index.html fixed")
PYEOF

# ─────────────────────────────────────────────
# 5. Trim unused vendor JS from all three pages
#    (purecounter, glightbox, isotope, swiper, validate, waypoints)
# ─────────────────────────────────────────────
python3 << 'PYEOF'
import re

UNUSED_VENDORS = [
    "purecounter.js",
    "glightbox.min.js",
    "isotope.pkgd.min.js",
    "swiper-bundle.min.js",
    "validate.js",
    "noframework.waypoints.js",
]

pages = ["index.html", "rumresources/index.html", "test/index.html"]

for page in pages:
    with open(page, "r") as f:
        content = f.read()
    for vendor in UNUSED_VENDORS:
        content = re.sub(
            r'[ \t]*<script src="/js/vendor/' + re.escape(vendor) + r'"></script>\n?',
            '',
            content
        )
    with open(page, "w") as f:
        f.write(content)
    print(f"✅ Unused vendor JS removed from {page}")
PYEOF

# ─────────────────────────────────────────────
# 6. Remove dead code from js/main.js
#    (GLightbox, Isotope, Swiper blocks, #navbar scroll logic)
# ─────────────────────────────────────────────
python3 << 'PYEOF'
with open("js/main.js", "r") as f:
    content = f.read()

import re

# Remove GLightbox init block
content = re.sub(
    r'\s*/\*--+\s*\* GLightbox \(image viewer\)\s*\*--+\*/\s*'
    r'GLightbox\(\{[^}]+\}\);',
    '',
    content, flags=re.DOTALL
)

# Remove Swiper portfolio-details-slider block
content = re.sub(
    r'\s*/\*--+\s*\* Portfolio details slider\s*\*--+\*/\s*'
    r'new Swiper\(\'\.portfolio-details-slider\'[^;]+;',
    '',
    content, flags=re.DOTALL
)

# Remove Swiper testimonials-slider block
content = re.sub(
    r'\s*/\*--+\s*\* Testimonials slider\s*\*--+\*/\s*'
    r'new Swiper\(\'\.testimonials-slider\'.*?\}\);',
    '',
    content, flags=re.DOTALL
)

# Remove Portfolio filtering (Isotope) block
content = re.sub(
    r'\s*/\*--+\s*\* Portfolio filtering with Isotope\s*\*--+\*/\s*'
    r'window\.addEventListener\(\'load\'[^}]+\}\s*\}\);',
    '',
    content, flags=re.DOTALL
)

# Remove navbar scroll-active block (targets #navbar which doesn't exist)
content = re.sub(
    r'\s*/\*--+\s*\* Navbar link state on scroll\s*\*--+\*/\s*'
    r'const navbarlinks.*?onscroll\(document, updateNavbarLinks\);',
    '',
    content, flags=re.DOTALL
)

with open("js/main.js", "w") as f:
    f.write(content)

print("✅ Dead code removed from js/main.js")
PYEOF

# ─────────────────────────────────────────────
# 7. Commit and push
# ─────────────────────────────────────────────
git add -A
git commit -m "site clean up"
git push

echo ""
echo "🏴‍☠️ All done! Changes committed and pushed."
