# Karan — Video Editor Portfolio

A premium, cinematic one-page portfolio website built with plain **HTML, CSS and JavaScript** (no frameworks, no build tools, no installs). This guide assumes you've never edited a website before — follow it step by step.

---

## 📁 Folder structure

```
Portfolio/
│── index.html          → the page content
│── style.css            → all the design/colors/spacing
│── script.js             → all the animations and interactivity
│── my-videos.txt         → 👉 YOUR video list — edit only this file to add videos (phone-friendly!)
│── README.md            → this file
│── assets/
│    └── icons/            → put any extra icon/image files here
│── videos/
      ├── anime/           → Anime Edit project videos
      ├── facecam/         → Face Cam Edit project videos
      ├── meme/            → Funny Meme project videos
      ├── podcast/         → Podcast project videos
      ├── random/          → Random Edit project videos
      └── typography/      → Typography project videos
```

Open `index.html` by double-clicking it to preview the site in your browser at any time.

---

## 🎬 How to replace a video

1. Find the category folder inside `videos/` (e.g. `videos/anime/`).
2. Rename your new video file to match exactly the file it's replacing, e.g. `project-1.mp4`, and drop it into that folder, replacing the old one.
3. Refresh the page in your browser. That's it — no code needed.

**Tips:**
- Keep files as `.mp4` (H.264) for the best browser compatibility.
- Keep each file under ~15MB where possible so the site stays fast. Compress large videos with a free tool like [HandBrake](https://handbrake.fr/) first.
- Vertical videos (9:16) look best in the portfolio cards, but any ratio will work.

---

## ➕ How to add a new project — 100% from your PHONE (no computer, no code)

**All your videos are managed in ONE plain text file: `my-videos.txt`.** It's just a list of file paths — no `{ }`, no code, nothing to break.

1. **Upload the video** — Open your GitHub repo in your phone's browser, go into the right `videos/<category>` folder (e.g. `videos/anime`), tap **Add file → Upload files**, and pick the video from your phone's gallery. Rename it first to something simple with dashes, e.g. `my-new-edit.mp4`.
2. **List it** — Open `my-videos.txt` in the browser, tap the pencil ✏️ icon to edit, and add one line at the bottom:
   ```
   videos/anime/my-new-edit.mp4 | A short description of the edit.
   ```
3. **Commit changes** — tap the green "Commit changes" button. If the site is connected to Vercel, it redeploys automatically in under a minute — refresh the live site and your video is there.

That's it — no code editor, no laptop required. The category is picked up from the folder, and the title is generated automatically from the file name (dashes become spaces, each word capitalized).

*(Prefer a computer? Same steps work in any text editor — open `my-videos.txt`, add a line, save.)*

---

## ⚠️ Important: GitHub has file size limits

GitHub is great for code, but it's **not built for large video files**:

- Uploading via the **website/phone browser** → each file must be under **25MB**
- Uploading via `git push` (computer) → GitHub **rejects** any file over **100MB**
- Keeping the whole repo small (ideally under ~1GB) keeps things fast and reliable

Most real portfolio edits are bigger than 25MB, so for anything above that, uploading the raw `.mp4` straight into the `videos/` folder either won't work or isn't a good idea.

### ✅ The fix: host big videos elsewhere, just paste the link

You don't have to change any code for this — `my-videos.txt` just needs a **link** instead of a local file path. Everything else (title, category, lazy-loading, the play button) works exactly the same.

**Easiest free option — Cloudinary** (works entirely from your phone browser, no app needed):
1. Create a free account at [cloudinary.com](https://cloudinary.com) (free plan includes 25GB storage — plenty for a portfolio).
2. From the Cloudinary dashboard, tap **Upload** and pick your video from your phone gallery.
3. Once uploaded, tap the video and copy its **direct URL** — it will end in `.mp4`.
4. In `my-videos.txt`, use that link instead of a `videos/...` path:
   ```
   https://res.cloudinary.com/your-name/video/upload/my-new-edit.mp4 | A short description.
   ```
5. Commit the change to `my-videos.txt` on GitHub as usual — done, no upload-to-GitHub needed at all.

Other similar free options that work the same way: **Bunny.net Stream**, **Cloudflare R2**, or **Google Drive** (note: Drive needs an extra step to get a true direct-playable link, so Cloudinary is the simplest for beginners).

The local `videos/` folders are still perfectly fine for **short/small clips** (under ~20MB) if you'd rather keep everything in one place — just don't rely on them for your full-length or high-quality exports.

---

## ✍️ How to change the name "Karan"

1. Open `index.html`.
2. Use your text editor's **Find & Replace** (Ctrl+F / Cmd+F) to search for `Karan` and replace every instance with your name.
3. Also update the `<title>` tag near the top of `index.html`.

---

## 📝 How to edit "About Me"

1. Open `index.html`.
2. Search for the section starting with `<section class="about" id="about">`.
3. Edit the text inside the `<p class="about-lead">` and `<p class="about-body">` tags with your own story.

---

## 📧 How to change the Email

1. Open `index.html` and search for `gamingsanji83@gmail.com`.
2. Replace **both** instances:
   - The visible text inside the Email contact card.
   - The `mailto:` link in `href="mailto:gamingsanji83@gmail.com"` (this is what makes clicking the button open Gmail/Mail).

---

## 💬 How to change the WhatsApp number

1. Open `index.html` and search for `wa.me/91838`.
2. Replace the number inside `href="https://wa.me/918384029202"` with your number in the format: country code + number, no `+`, no spaces (e.g. `919876543210`).
3. Also update the visible phone number text in the WhatsApp contact card.

---

## 📸 How to change Instagram

1. Open `index.html` and search for `instagram.com`.
2. Replace `href="https://instagram.com/"` with your profile link, e.g. `https://instagram.com/yourusername`.
3. Update the visible `@karan.edits` text with your real handle.

---

## 🎨 How to change the colors

1. Open `style.css`.
2. At the very top, inside `:root { ... }`, you'll find all the site's colors in one place:

```css
--bg: #050505;          /* main background */
--purple: #8b5cf6;      /* accent color */
--purple-light: #c4b5fd; /* lighter accent used for glows/text */
--white: #f5f5f7;       /* main text color */
--muted: #8a8a93;       /* secondary/gray text */
```

3. Change any hex code and save — every section using that variable updates automatically. You can pick new colors visually at [coolors.co](https://coolors.co) or [Google's color picker](https://g.co/kgs/colorpicker).

---

## ⬆️ How to upload this project to GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Click **New repository**, name it (e.g. `karan-portfolio`), and click **Create repository**.
3. On the new repo page, click **uploading an existing file**.
4. Drag and drop the entire `Portfolio` folder's contents (`index.html`, `style.css`, `script.js`, `README.md`, `assets/`, `videos/`) into the browser window.
5. Scroll down and click **Commit changes**.

*(If you prefer using Git from the command line instead of the browser upload, that works too — but the steps above require no installs.)*

---

## 🚀 How to deploy on Vercel (make it a live website)

1. Create a free account at [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New → Project**.
3. Select the GitHub repository you created above (e.g. `karan-portfolio`) and click **Import**.
4. Leave all settings as default (no framework/build step is needed) and click **Deploy**.
5. After a minute, Vercel gives you a live link like `karan-portfolio.vercel.app` — that's your live website you can share with clients.

Every time you upload changes to GitHub, Vercel automatically redeploys the site with your updates.

---

## ⚡ Performance & code notes

- No frameworks or build tools — just open `index.html` and it works.
- Videos use `preload="metadata"` and only start playing on hover/click, keeping initial load fast.
- All animations respect `prefers-reduced-motion` for accessibility.
- The site is fully responsive: tested down to small mobile widths.
- Code is commented in `script.js` and `style.css` to make future edits easy, even if you're not a developer.

Enjoy your new portfolio! 🎬
