# Troubleshooting Guide

## Loading Error Solutions

### 1. **"Error occurred while loading the sites"**

**Solution:**
1. **Open browser console** (F12 → Console tab)
2. **Check for error messages** - they will tell us exactly what's wrong
3. **Try the test file first**: Open `test.html` to see if basic HTML works

### 2. **Common Issues & Fixes**

#### **Issue: CSS not loading**
- **Symptom**: Page looks plain/basic
- **Fix**: Check if `todo.css` file exists in the same folder

#### **Issue: JavaScript not loading**
- **Symptom**: Buttons don't work, no functionality
- **Fix**: Check if `todo.js` file exists in the same folder

#### **Issue: Fonts not loading**
- **Symptom**: Text looks different than expected
- **Fix**: Check internet connection (fonts load from Google)

#### **Issue: Sound files not loading**
- **Symptom**: No sound effects, but app works
- **Fix**: Replace placeholder sound files with real audio files

### 3. **Step-by-Step Debugging**

1. **First, try the test file:**
   ```
   Open: test.html
   Should see: "Test Page" with a working button
   ```

2. **Check file structure:**
   ```
   todlistextension/
   ├── todo.html ✅
   ├── todo.css ✅
   ├── todo.js ✅
   ├── test.html ✅
   └── sounds/
       ├── tick.mp3
       ├── click.mp3
       └── chimes.mp3
   ```

3. **Open browser console (F12):**
   - Look for red error messages
   - Check for "Resource failed to load" messages

4. **Try different browsers:**
   - Chrome (recommended)
   - Edge
   - Firefox

### 4. **Quick Fixes**

#### **If nothing loads:**
```html
<!-- Try this simple version -->
<!DOCTYPE html>
<html>
<head><title>Simple Test</title></head>
<body style="background:#000;color:#fff;padding:20px;">
  <h1>Harsh's Todo List</h1>
  <p>If you see this, HTML is working!</p>
  <button onclick="alert('JavaScript works!')">Test Button</button>
</body>
</html>
```

#### **If CSS doesn't load:**
- Check file permissions
- Try opening `todo.css` directly in browser
- Verify file is not corrupted

#### **If JavaScript doesn't load:**
- Check browser console for syntax errors
- Verify `todo.js` file exists
- Try refreshing the page

### 5. **Browser-Specific Issues**

#### **Chrome:**
- Go to `chrome://extensions/`
- Enable "Developer mode"
- Load unpacked extension

#### **Firefox:**
- May need to adjust security settings
- Try `about:config` → `security.fileuri.strict_origin_policy` → `false`

#### **Edge:**
- Should work the same as Chrome
- Check if any security warnings appear

### 6. **File Permissions**

Make sure all files have proper read permissions:
- Windows: Right-click → Properties → Security
- Mac/Linux: `chmod 644 *.html *.css *.js`

### 7. **Still Having Issues?**

1. **Create a new folder** and copy all files fresh
2. **Try a different browser**
3. **Check if antivirus is blocking files**
4. **Try opening files directly** (not through server)

### 8. **Contact Information**

If you're still having issues:
1. **Screenshot the error message**
2. **Copy the console output** (F12 → Console)
3. **List which browser you're using**
4. **Describe what happens when you try to load the page**

---

**Remember:** The app should work even without sound files. The delete buttons and all functionality should work regardless of sound issues. 