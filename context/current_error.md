Values are estimated and may vary. The performance score is calculated directly from these metrics.See calculator.
0–49
50–89
90–100
Final Screenshot

Metrics
Collapse view
First Contentful Paint
17.4 s
First Contentful Paint marks the time at which the first text or image is painted. Learn more about the First Contentful Paint metric.
Largest Contentful Paint
58.1 s
Largest Contentful Paint marks the time at which the largest text or image is painted. Learn more about the Largest Contentful Paint metric
Total Blocking Time
5,790 ms
Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. Learn more about the Total Blocking Time metric.
Cumulative Layout Shift
0.59
Cumulative Layout Shift measures the movement of visible elements within the viewport. Learn more about the Cumulative Layout Shift metric.
Speed Index
17.4 s
Speed Index shows how quickly the contents of a page are visibly populated. Learn more about the Speed Index metric.
View Treemap
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Show audits relevant to:

All

FCP

LCP

TBT

CLS
Insights
Render-blocking requests Est savings of 300 ms
Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.FCPLCPUnscored
URL
Transfer Size
Duration
Google Fonts cdn 
1.6 KiB	1,120 ms
/css2?family=…(fonts.googleapis.com)
1.6 KiB
1,120 ms
Layout shift culprits
Layout shifts occur when elements move absent any user interaction. Investigate the causes of layout shifts, such as elements being added, removed, or their fonts changing as the page loads.CLSUnscored
Element
Layout shift score
Total
0.590
footer.MuiBox-root.css-3jdgyr
0.590
div.MuiBox-root.css-axw7ok
0.000
…v22/V8mDoQDjQ….woff2(fonts.gstatic.com)
Web font
…v17/i7dMIFZif….woff2(fonts.gstatic.com)
Web font
…v20/UcC73FwrK….woff2(fonts.gstatic.com)
Web font
…v17/i7dPIFZif….woff2(fonts.gstatic.com)
Web font
Forced reflow
A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about forced reflows and possible mitigations.Unscored
Top function call
Total reflow time
react-dom_client.js?v=ecd77523:9077
43 ms
Source
Total reflow time
@mui_material.js?v=ecd77523:17355
42 ms
@mui_material.js?v=ecd77523:17364
0 ms
[unattributed]
61 ms
:5173/node_modules/.…f.js?v=ecd77523:156
3 ms
framer-motion.js?v=ecd77523:7241
0 ms
@mui_material.js?v=ecd77523:36708
18 ms
@mui_material.js?v=ecd77523:37115
1 ms
LCP breakdown
Each subpart has specific improvement strategies. Ideally, most of the LCP time should be spent on loading the resources, not within delays.LCPUnscored
Subpart
Duration
Time to first byte
10 ms
Element render delay
3,950 ms
What do you want to learn today?
<p class="MuiTypography-root MuiTypography-body1 css-h9asar-MuiTypography-root">
Network dependency tree
Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.LCPUnscored
Maximum critical path latency: 2,936 ms
Initial Navigation
http://localhost:5173 - 50 ms, 3.65 KiB
/css2?family=…(fonts.googleapis.com) - 919 ms, 1.62 KiB
…v17/i7dMIFZif….woff2(fonts.gstatic.com) - 2,936 ms, 9.44 KiB
…v22/V8mDoQDjQ….woff2(fonts.gstatic.com) - 2,935 ms, 21.92 KiB
…v17/i7dPIFZif….woff2(fonts.gstatic.com) - 2,932 ms, 9.36 KiB
…v20/UcC73FwrK….woff2(fonts.gstatic.com) - 2,930 ms, 47.83 KiB
/src/main.tsx?t=177…(localhost) - 90 ms, 2.62 KiB
/src/App.tsx?t=177…(localhost) - 124 ms, 6.12 KiB
/src/router.ts?t=177…(localhost) - 161 ms, 1.63 KiB
/src/routeTree.gen.ts?t=177…(localhost) - 178 ms, 18.63 KiB
…routes/__root.tsx?t=177…(localhost) - 202 ms, 19.07 KiB
…deps/@tanstack_router-devtools.js?v=ecd77523(localhost) - 237 ms, 9.61 KiB
…deps/context-D….js?v=ecd77523(localhost) - 276 ms, 51.75 KiB
…home/HomePage.tsx?t=177…(localhost) - 1,268 ms, 11.34 KiB
…components/CategoryGrid.tsx(localhost) - 1,297 ms, 10.58 KiB
…CategoryCard/CategoryCard.tsx(localhost) - 1,355 ms, 17.22 KiB
…deps/@mui_icons-material.js?v=ecd77523(localhost) - 1,535 ms, 5,955.68 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,588 ms, 1.45 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,588 ms, 0.94 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,587 ms, 0.80 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,587 ms, 1.06 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,587 ms, 0.91 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,587 ms, 1.01 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,586 ms, 1.03 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,586 ms, 0.86 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,585 ms, 0.92 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,585 ms, 0.85 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,585 ms, 0.85 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,584 ms, 0.78 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,576 ms, 0.89 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,576 ms, 0.82 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,576 ms, 0.81 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,576 ms, 0.77 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,576 ms, 0.77 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,575 ms, 0.82 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,564 ms, 0.85 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,563 ms, 0.84 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,563 ms, 0.79 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,563 ms, 0.79 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,563 ms, 1.27 KiB
…lib/utils.ts(localhost) - 1,430 ms, 3.34 KiB
…components/ContributeCTA.tsx(localhost) - 1,302 ms, 14.34 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,406 ms, 1.06 KiB
…components/QuickLinks.tsx(localhost) - 1,301 ms, 20.81 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,406 ms, 0.93 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,405 ms, 0.86 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,405 ms, 0.89 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,405 ms, 0.87 KiB
…components/SecondaryClassSpotlight.tsx(localhost) - 1,300 ms, 24.82 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,405 ms, 0.79 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 1,394 ms, 0.85 KiB
…data/categories.json?import(localhost) - 1,307 ms, 5.84 KiB
…ScrollReveal/ScrollReveal.tsx(localhost) - 1,306 ms, 6.48 KiB
…components/ClassSpotlight.tsx?t=177…(localhost) - 1,298 ms, 25.84 KiB
…components/HeroSection.tsx(localhost) - 1,296 ms, 38.15 KiB
…deps/FloatingT….js?v=ecd77523(localhost) - 1,278 ms, 25.33 KiB
…deps/BaseTanSt….js?v=ecd77523(localhost) - 1,310 ms, 72.03 KiB
…BottomTabBar/BottomTabBar.tsx?t=177…(localhost) - 242 ms, 13.51 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 290 ms, 0.94 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 289 ms, 0.92 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 288 ms, 1.61 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 287 ms, 0.78 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 285 ms, 0.75 KiB
…Header/Header.tsx(localhost) - 238 ms, 34.56 KiB
…data/site-config.json?import(localhost) - 284 ms, 1.97 KiB
…data/navigation.json?import(localhost) - 280 ms, 5.56 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 278 ms, 0.89 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 278 ms, 1.47 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 277 ms, 0.75 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 274 ms, 0.82 KiB
…hooks/useAnalytics.ts(localhost) - 255 ms, 4.98 KiB
…CookieConsent/CookieConsent.tsx(localhost) - 254 ms, 13.42 KiB
…PageTransition/PageTransition.tsx(localhost) - 249 ms, 4.85 KiB
…Footer/Footer.tsx(localhost) - 241 ms, 28.11 KiB
…routes/$.tsx?t=177…(localhost) - 220 ms, 24.63 KiB
…Doodles/index.ts(localhost) - 261 ms, 1.37 KiB
…Doodles/PencilDoodle.tsx(localhost) - 293 ms, 5.51 KiB
…Doodles/BookDoodle.tsx(localhost) - 293 ms, 6.76 KiB
…Doodles/SquiggleDoodle.tsx(localhost) - 292 ms, 4.10 KiB
…Doodles/ArrowDoodle.tsx(localhost) - 292 ms, 5.40 KiB
…Doodles/StarDoodle.tsx(localhost) - 290 ms, 4.29 KiB
…deps/framer-motion.js?v=ecd77523(localhost) - 280 ms, 490.34 KiB
…lib/constants.ts(localhost) - 263 ms, 3.27 KiB
…routes/view.$id.tsx?t=177…(localhost) - 227 ms, 7.41 KiB
…data/resources.json?import(localhost) - 272 ms, 125.81 KiB
…routes/search.tsx?t=177…(localhost) - 210 ms, 11.09 KiB
…hooks/useSEO.ts(localhost) - 258 ms, 18.49 KiB
…lib/filterUtils.ts(localhost) - 258 ms, 6.17 KiB
…SuspenseLoader/SuspenseLoader.tsx(localhost) - 257 ms, 4.63 KiB
…routes/resources.admissions.tsx?t=177…(localhost) - 235 ms, 9.20 KiB
…routes/resources.formats.tsx?t=177…(localhost) - 234 ms, 9.15 KiB
…routes/resources.primary.tsx?t=177…(localhost) - 233 ms, 9.31 KiB
…routes/resources.programs.tsx?t=177…(localhost) - 233 ms, 9.09 KiB
…routes/index.tsx?t=177…(localhost) - 224 ms, 6.45 KiB
…routes/about.tsx?t=177…(localhost) - 218 ms, 5.99 KiB
…routes/resources.secondary.tsx?t=177…(localhost) - 218 ms, 9.32 KiB
…routes/contribute.tsx?t=177…(localhost) - 216 ms, 6.02 KiB
…routes/resources.tsx?t=177…(localhost) - 212 ms, 1.61 KiB
…config/theme.ts(localhost) - 161 ms, 15.58 KiB
…deps/@mui_material_styles.js?v=ecd77523(localhost) - 177 ms, 8.93 KiB
…deps/styled-DM3IS-2L.js?v=ecd77523(localhost) - 208 ms, 275.11 KiB
…deps/emotion-i….esm-QarGTpvp.js?v=ecd77523(localhost) - 255 ms, 5.46 KiB
…deps/styles-B6fHbNoC.js?v=ecd77523(localhost) - 201 ms, 19.88 KiB
…deps/@mui_material.js?v=ecd77523(localhost) - 252 ms, 1,233.68 KiB
…deps/@tanstack_react-router.js?v=ecd77523(localhost) - 158 ms, 15.56 KiB
…deps/index.dev-Df8cPVqr.js?v=ecd77523(localhost) - 186 ms, 260.30 KiB
…Snackbar/Snackbar.tsx(localhost) - 164 ms, 8.92 KiB
…context/ThemeContext.tsx(localhost) - 164 ms, 6.95 KiB
…ErrorBoundary/ErrorBoundary.tsx(localhost) - 133 ms, 9.52 KiB
…deps/@mui_icons….js?v=ecd77523(localhost) - 167 ms, 0.94 KiB
…deps/createSvg….js?v=ecd77523(localhost) - 188 ms, 10.25 KiB
…deps/clsx-CAT_cZ_M.js?v=ecd77523(localhost) - 232 ms, 0.88 KiB
…deps/react_jsx-runtime.js?v=ecd77523(localhost) - 188 ms, 10.87 KiB
…deps/react-dom_client.js?v=ecd77523(localhost) - 131 ms, 801.98 KiB
…deps/react-dom.js?v=ecd77523(localhost) - 164 ms, 14.53 KiB
…deps/react.js?v=ecd77523(localhost) - 101 ms, 1.04 KiB
…deps/react-BRYbbeEC.js?v=ecd77523(localhost) - 144 ms, 39.21 KiB
…deps/react_jsx-dev-runtime.js?v=ecd77523(localhost) - 120 ms, 10.57 KiB
/src/index.css?t=177…(localhost) - 114 ms, 16.99 KiB
/@vite/client(localhost) - 93 ms, 200.92 KiB
…client/env.mjs(localhost) - 134 ms, 3.87 KiB
/@react-refresh(localhost) - 112 ms, 109.56 KiB
Preconnected origins
preconnect hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.
Origin
Source
https://fonts.googleapis.com/
link
https://fonts.gstatic.com/
link
Unused preconnect. Check that the `crossorigin` attribute is used properly.
Preconnect candidates
Add preconnect hints to your most important origins, but try to use no more than 4.
Origin
Est LCP savings
https://fonts.gstatic.com
370 ms
Document request latency Est savings of 2 KiB
Your first network request is the most important. Reduce its latency by avoiding redirects, ensuring a fast server response, and enabling text compression.FCPLCPUnscored
Avoids redirects
Server responds quickly (observed 6 ms)
No compression applied
3rd parties
3rd party code can significantly impact load performance. Reduce and defer loading of 3rd party code to prioritize your page's content.Unscored
3rd party
Transfer size
Main thread time
fheoggkfdfchfphceeifdbepaooicaho
0 KiB	7 ms
chrome-extension://fheoggkfdfchfphceeifdbepaooicaho/scripts/iframe_form_detection.js
0 KiB
3 ms
chrome-extension://fheoggkfdfchfphceeifdbepaooicaho/scripts/content_navigate_complete.js
0 KiB
2 ms
chrome-extension://fheoggkfdfchfphceeifdbepaooicaho/scripts/iframe_form_check.js
0 KiB
2 ms
Google Fonts cdn 
90 KiB	0 ms
…v20/UcC73FwrK….woff2(fonts.gstatic.com)
48 KiB
0 ms
…v22/V8mDoQDjQ….woff2(fonts.gstatic.com)
22 KiB
0 ms
…v17/i7dMIFZif….woff2(fonts.gstatic.com)
9 KiB
0 ms
…v17/i7dPIFZif….woff2(fonts.gstatic.com)
9 KiB
0 ms
/css2?family=…(fonts.googleapis.com)
2 KiB
0 ms
These insights are also available in the Chrome DevTools Performance Panel - record a trace to view more detailed information.
Diagnostics
Minimize main-thread work 11.9 s
Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. Learn how to minimize main-thread workTBTUnscored
Category
Time Spent
Script Evaluation
7,822 ms
Other
2,435 ms
Style & Layout
1,230 ms
Rendering
210 ms
Garbage Collection
99 ms
Script Parsing & Compilation
55 ms
Parse HTML & CSS
26 ms
Reduce JavaScript execution time 7.8 s
Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. Learn how to reduce Javascript execution time.TBTUnscored
URL
Total CPU Time
Script Evaluation
Script Parse
localhost 1st party
10,358 ms	7,616 ms	13 ms
…components/HeroSection.tsx(localhost)
5,331 ms
4,968 ms
0 ms
…deps/react-dom_client.js?v=ecd77523(localhost)
2,488 ms
2,041 ms
5 ms
http://localhost:5173
1,361 ms
38 ms
5 ms
…deps/framer-motion.js?v=ecd77523(localhost)
854 ms
266 ms
3 ms
…context/ThemeContext.tsx(localhost)
172 ms
162 ms
0 ms
…deps/BaseTanSt….js?v=ecd77523(localhost)
152 ms
141 ms
1 ms
Unattributable
1,292 ms	174 ms	0 ms
Unattributable
1,292 ms
174 ms
0 ms
Minify JavaScript Est savings of 2,866 KiB
Minifying JavaScript files can reduce payload sizes and script parse time. Learn how to minify JavaScript.FCPLCPUnscored
URL
Transfer Size
Est Savings
localhost 1st party
10,193.9 KiB	2,866.4 KiB
…deps/@mui_icons-material.js?v=ecd77523(localhost)
5,955.4 KiB
1,229.4 KiB
…deps/@mui_material.js?v=ecd77523(localhost)
1,233.4 KiB
389.9 KiB
…deps/framer-motion.js?v=ecd77523(localhost)
490.0 KiB
193.6 KiB
/@vite/client(localhost)
200.6 KiB
169.8 KiB
…deps/react-dom_client.js?v=ecd77523(localhost)
801.7 KiB
125.3 KiB
…data/resources.json?import(localhost)
125.5 KiB
106.3 KiB
/@react-refresh(localhost)
109.3 KiB
99.3 KiB
…deps/index.dev-Df8cPVqr.js?v=ecd77523(localhost)
260.0 KiB
79.6 KiB
…deps/styled-DM3IS-2L.js?v=ecd77523(localhost)
274.8 KiB
67.1 KiB
…components/HeroSection.tsx(localhost)
37.9 KiB
28.2 KiB
…Header/Header.tsx(localhost)
34.3 KiB
24.9 KiB
…Footer/Footer.tsx(localhost)
27.8 KiB
19.8 KiB
…components/ClassSpotlight.tsx?t=177…(localhost)
25.6 KiB
18.7 KiB
…routes/$.tsx?t=177…(localhost)
24.3 KiB
17.3 KiB
…components/SecondaryClassSpotlight.tsx(localhost)
24.5 KiB
17.1 KiB
/src/routeTree.gen.ts?t=177…(localhost)
18.3 KiB
15.4 KiB
…components/QuickLinks.tsx(localhost)
20.5 KiB
14.2 KiB
…hooks/useSEO.ts(localhost)
18.2 KiB
14.2 KiB
…deps/BaseTanSt….js?v=ecd77523(localhost)
71.7 KiB
12.8 KiB
…deps/@tanstack_react-router.js?v=ecd77523(localhost)
15.3 KiB
12.2 KiB
…config/theme.ts(localhost)
15.3 KiB
12.0 KiB
…CategoryCard/CategoryCard.tsx(localhost)
16.9 KiB
11.7 KiB
…routes/__root.tsx?t=177…(localhost)
18.8 KiB
11.0 KiB
…deps/context-D….js?v=ecd77523(localhost)
51.4 KiB
10.1 KiB
…components/ContributeCTA.tsx(localhost)
14.1 KiB
9.2 KiB
…CookieConsent/CookieConsent.tsx(localhost)
13.1 KiB
8.7 KiB
…BottomTabBar/BottomTabBar.tsx?t=177…(localhost)
13.2 KiB
8.4 KiB
…deps/styles-B6fHbNoC.js?v=ecd77523(localhost)
19.6 KiB
6.9 KiB
…deps/@mui_material_styles.js?v=ecd77523(localhost)
8.6 KiB
6.8 KiB
…components/CategoryGrid.tsx(localhost)
10.3 KiB
6.6 KiB
…routes/search.tsx?t=177…(localhost)
10.8 KiB
6.6 KiB
…home/HomePage.tsx?t=177…(localhost)
11.1 KiB
6.4 KiB
…deps/react-BRYbbeEC.js?v=ecd77523(localhost)
38.9 KiB
6.4 KiB
…ErrorBoundary/ErrorBoundary.tsx(localhost)
9.2 KiB
6.1 KiB
…Snackbar/Snackbar.tsx(localhost)
8.6 KiB
5.2 KiB
…routes/resources.secondary.tsx?t=177…(localhost)
9.0 KiB
5.1 KiB
…routes/resources.primary.tsx?t=177…(localhost)
9.0 KiB
5.1 KiB
…routes/resources.admissions.tsx?t=177…(localhost)
8.9 KiB
5.0 KiB
…routes/resources.formats.tsx?t=177…(localhost)
8.9 KiB
5.0 KiB
…routes/resources.programs.tsx?t=177…(localhost)
8.8 KiB
5.0 KiB
…data/categories.json?import(localhost)
5.6 KiB
4.5 KiB
…lib/filterUtils.ts(localhost)
5.9 KiB
4.5 KiB
…data/navigation.json?import(localhost)
5.3 KiB
4.4 KiB
…deps/createSvg….js?v=ecd77523(localhost)
9.9 KiB
3.9 KiB
…routes/view.$id.tsx?t=177…(localhost)
7.1 KiB
3.8 KiB
…context/ThemeContext.tsx(localhost)
6.7 KiB
3.6 KiB
…hooks/useAnalytics.ts(localhost)
4.7 KiB
3.5 KiB
…Doodles/BookDoodle.tsx(localhost)
6.5 KiB
3.5 KiB
…ScrollReveal/ScrollReveal.tsx(localhost)
6.2 KiB
3.5 KiB
…client/env.mjs(localhost)
3.6 KiB
3.1 KiB
…routes/index.tsx?t=177…(localhost)
6.2 KiB
3.0 KiB
/src/App.tsx?t=177…(localhost)
5.8 KiB
2.8 KiB
…routes/about.tsx?t=177…(localhost)
5.7 KiB
2.7 KiB
…Doodles/ArrowDoodle.tsx(localhost)
5.1 KiB
2.7 KiB
…routes/contribute.tsx?t=177…(localhost)
5.7 KiB
2.7 KiB
…Doodles/PencilDoodle.tsx(localhost)
5.2 KiB
2.6 KiB
…lib/utils.ts(localhost)
3.1 KiB
2.3 KiB
…lib/constants.ts(localhost)
3.0 KiB
2.3 KiB
…PageTransition/PageTransition.tsx(localhost)
4.6 KiB
2.1 KiB
…deps/react-dom.js?v=ecd77523(localhost)
14.2 KiB
2.0 KiB
Reduce unused JavaScript Est savings of 1,276 KiB
Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. Learn how to reduce unused JavaScript.FCPLCPUnscored
URL
Transfer Size
Est Savings
localhost 1st party
3,059.7 KiB	1,276.4 KiB
…deps/@mui_material.js?v=ecd77523(localhost)
1,233.3 KiB
564.6 KiB
…@mui/material/useAutocomplete/useAutocomplete.mjs
27.7 KiB
27.3 KiB
…@mui/material/Slider/useSlider.mjs
18.3 KiB
18.0 KiB
…@mui/material/Select/SelectInput.mjs
16.7 KiB
14.4 KiB
…@mui/material/Tooltip/Tooltip.mjs
16.4 KiB
13.8 KiB
…@mui/material/Slider/Slider.mjs
19.2 KiB
13.6 KiB
…deps/framer-motion.js?v=ecd77523(localhost)
490.0 KiB
265.2 KiB
…motion-dom/dist/es/projection/node/create-projection-node.mjs
34.7 KiB
28.7 KiB
…framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
12.2 KiB
12.1 KiB
…framer-motion/dist/es/animation/sequence/create.mjs
6.9 KiB
6.8 KiB
…motion-dom/dist/es/layout/LayoutAnimationBuilder.mjs
6.4 KiB
6.3 KiB
…framer-motion/dist/es/gestures/pan/PanSession.mjs
6.0 KiB
5.9 KiB
…deps/react-dom_client.js?v=ecd77523(localhost)
801.6 KiB
258.1 KiB
…react-dom/cjs/react-dom-client.development.js
733.3 KiB
236.5 KiB
…scheduler/cjs/scheduler.development.js
8.3 KiB
1.8 KiB
…deps/styled-DM3IS-2L.js?v=ecd77523(localhost)
274.8 KiB
97.3 KiB
…@mui/material/styles/createThemeWithVars.mjs
21.1 KiB
21.1 KiB
…prop-types/factoryWithTypeCheckers.js
14.3 KiB
11.0 KiB
…@mui/system/cssVars/createCssVarsProvider.mjs
8.8 KiB
6.8 KiB
…@mui/system/cssVars/useCurrentColorScheme.mjs
5.8 KiB
5.8 KiB
…@emotion/react/dist/emotion-element-489459f2.browser.development.esm.js
4.3 KiB
3.1 KiB
…deps/index.dev-Df8cPVqr.js?v=ecd77523(localhost)
260.0 KiB
91.1 KiB
…@tanstack/react-router/dist/esm/link.js
13.1 KiB
12.6 KiB
…@tanstack/router-core/dist/esm/router.js
38.0 KiB
10.1 KiB
…@tanstack/history/dist/esm/index.js
10.0 KiB
7.1 KiB
…@tanstack/router-core/dist/esm/load-matches.js
22.9 KiB
6.8 KiB
…@tanstack/react-router/dist/esm/headContentUtils.js
6.0 KiB
6.0 KiB
Page prevented back/forward cache restoration 1 failure reason
Many navigations are performed by going back to a previous page, or forwards again. The back/forward cache (bfcache) can speed up these return navigations. Learn more about the bfcacheUnscored
Failure reason
Failure type
Pages with WebSocket cannot enter back/forward cache.
Pending browser support
http://localhost:5173
Avoid enormous network payloads Total size was 10,455 KiB
Large network payloads cost users real money and are highly correlated with long load times. Learn how to reduce payload sizes.Unscored
URL
Transfer Size
localhost 1st party
9,525.4 KiB
…deps/@mui_icons-material.js?v=ecd77523(localhost)
5,955.7 KiB
…deps/@mui_material.js?v=ecd77523(localhost)
1,233.7 KiB
…deps/react-dom_client.js?v=ecd77523(localhost)
802.0 KiB
…deps/framer-motion.js?v=ecd77523(localhost)
490.3 KiB
…deps/styled-DM3IS-2L.js?v=ecd77523(localhost)
275.1 KiB
…deps/index.dev-Df8cPVqr.js?v=ecd77523(localhost)
260.3 KiB
/@vite/client(localhost)
200.9 KiB
…data/resources.json?import(localhost)
125.8 KiB
/@react-refresh(localhost)
109.6 KiB
…deps/BaseTanSt….js?v=ecd77523(localhost)
72.0 KiB
Avoid long main-thread tasks 11 long tasks found
Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. Learn how to avoid long main-thread tasksTBTUnscored
URL
Start Time
Duration
localhost 1st party
6,651 ms
…components/HeroSection.tsx(localhost)
27,050 ms
5,330 ms
…deps/react-dom_client.js?v=ecd77523(localhost)
24,849 ms
526 ms
…deps/react-dom_client.js?v=ecd77523(localhost)
25,375 ms
269 ms
…deps/BaseTanSt….js?v=ecd77523(localhost)
32,380 ms
177 ms
…context/ThemeContext.tsx(localhost)
22,436 ms
94 ms
http://localhost:5173
953 ms
70 ms
http://localhost:5173
606 ms
67 ms
…deps/react-dom_client.js?v=ecd77523(localhost)
22,628 ms
60 ms
…deps/react-dom_client.js?v=ecd77523(localhost)
22,570 ms
58 ms
Unattributable
422 ms
Unattributable
673 ms
274 ms
Unattributable
1,064 ms
148 ms
User Timing marks and measures 83 user timings
Consider instrumenting your app with the User Timing API to measure your app's real-world performance during key user experiences. Learn more about User Timing marks.Unscored
Name
Type
Start Time
Duration
Update Blocked
Measure
966.20 ms
14.60 ms
Mount
Measure
983.10 ms
18.60 ms
Reconnect
Measure
997.70 ms
2.40 ms
Mount
Measure
1,006.50 ms
6.10 ms
Update Blocked
Measure
1,010.30 ms
242.70 ms
Reconnect
Measure
1,017.80 ms
2.30 ms
Mount
Measure
1,017.80 ms
3.10 ms
Cascading Update
Measure
1,022.80 ms
0.90 ms
Update
Measure
1,026.90 ms
1.30 ms
Mount
Measure
1,028.80 ms
85.70 ms
​CatchBoundaryImpl
Measure
1,028.80 ms
85.70 ms
​CatchBoundary
Measure
1,028.80 ms
85.70 ms
Reconnect
Measure
1,069.30 ms
9.10 ms
Mount
Measure
1,115.80 ms
7.70 ms
Mount
Measure
1,124.30 ms
1.70 ms
Mount
Measure
1,131.90 ms
22.80 ms
Reconnect
Measure
1,138.00 ms
1.80 ms
Cascading Update
Measure
1,159.80 ms
0.40 ms
Mount
Measure
1,160.60 ms
14.20 ms
Mount
Measure
1,175.50 ms
0.80 ms
Mount
Measure
1,176.60 ms
0.60 ms
Mount
Measure
1,183.00 ms
46.40 ms
Cascading Update
Measure
1,254.30 ms
1.70 ms
Update
Measure
1,267.80 ms
3.00 ms
Promise Resolved
Measure
2,921.30 ms
340.40 ms
Reconnect
Measure
2,965.80 ms
190.20 ms
Reconnect
Measure
3,157.70 ms
8.70 ms
Mount
Measure
3,157.70 ms
8.70 ms
Reconnect
Measure
3,166.70 ms
6.50 ms
Unmount
Measure
3,173.70 ms
0.10 ms
Reconnect
Measure
3,174.50 ms
73.90 ms
​MuiTabsRoot
Measure
3,263.10 ms
9.80 ms
​Styled(ScrollbarSize)
Measure
3,263.80 ms
0.40 ms
​MuiTabsScroller
Measure
3,264.20 ms
8.70 ms
​MuiTabsList
Measure
3,264.50 ms
8.00 ms
​ForwardRef(Tab)
Measure
3,264.80 ms
1.50 ms
​MuiTabRoot
Measure
3,265.10 ms
1.20 ms
​ForwardRef(ButtonBase)
Measure
3,265.40 ms
0.90 ms
​MuiButtonBaseRoot
Measure
3,265.70 ms
0.60 ms
​MuiTabRoot
Measure
3,266.90 ms
1.60 ms
​ForwardRef(ButtonBase)
Measure
3,267.50 ms
1.00 ms
​MuiButtonBaseRoot
Measure
3,267.90 ms
0.60 ms
​MuiTabRoot
Measure
3,268.90 ms
1.00 ms
​Insertion
Measure
3,269.30 ms
0.10 ms
​ForwardRef(ButtonBase)
Measure
3,269.40 ms
0.50 ms
​MuiButtonBaseRoot
Measure
3,269.60 ms
0.30 ms
​MuiTabRoot
Measure
3,270.20 ms
1.00 ms
​ForwardRef(ButtonBase)
Measure
3,270.50 ms
0.70 ms
​MuiButtonBaseRoot
Measure
3,270.80 ms
0.40 ms
​MuiTabRoot
Measure
3,271.40 ms
1.10 ms
​ForwardRef(ButtonBase)
Measure
3,271.70 ms
0.80 ms
​MuiButtonBaseRoot
Measure
3,271.90 ms
0.60 ms
Mount
Measure
3,272.50 ms
0.40 ms
Unmount
Measure
3,273.40 ms
0.10 ms
Update
Measure
3,303.60 ms
4.10 ms
​MuiTabsRoot
Measure
3,309.60 ms
10.10 ms
Mount
Measure
3,310.30 ms
1.80 ms
​Styled(ScrollbarSize)
Measure
3,312.10 ms
0.30 ms
​Insertion
Measure
3,312.30 ms
0.10 ms
​MuiTabsScroller
Measure
3,312.40 ms
6.00 ms
​MuiTabsList
Measure
3,312.60 ms
5.60 ms
​Insertion
Measure
3,312.80 ms
0.10 ms
​MuiTabRoot
Measure
3,313.00 ms
1.90 ms
​ForwardRef(ButtonBase)
Measure
3,313.80 ms
1.10 ms
​MuiButtonBaseRoot
Measure
3,314.30 ms
0.60 ms
​MuiTabRoot
Measure
3,315.20 ms
0.80 ms
​ForwardRef(ButtonBase)
Measure
3,315.40 ms
0.60 ms
​MuiButtonBaseRoot
Measure
3,315.60 ms
0.40 ms
​Insertion
Measure
3,315.90 ms
0.10 ms
​MuiTabRoot
Measure
3,316.20 ms
0.50 ms
​ForwardRef(ButtonBase)
Measure
3,316.30 ms
0.40 ms
​MuiButtonBaseRoot
Measure
3,316.50 ms
0.20 ms
​MuiTabRoot
Measure
3,316.90 ms
0.60 ms
​ForwardRef(ButtonBase)
Measure
3,317.10 ms
0.40 ms
​MuiButtonBaseRoot
Measure
3,317.30 ms
0.20 ms
​MuiTabRoot
Measure
3,317.60 ms
0.60 ms
​ForwardRef(ButtonBase)
Measure
3,317.80 ms
0.40 ms
​MuiButtonBaseRoot
Measure
3,317.90 ms
0.30 ms
​MuiTabsIndicator
Measure
3,318.20 ms
0.20 ms
Mount
Measure
3,318.40 ms
1.30 ms
Mount
Measure
3,321.10 ms
0.30 ms
Mount
Measure
3,321.70 ms
0.10 ms
Update
Measure
3,332.60 ms
0.70 ms
More information about the performance of your application. These numbers don't directly affect the Performance score.
Passed audits (14)
Show
81
Accessibility
These checks highlight opportunities to improve the accessibility of your web app. Automatic detection can only detect a subset of issues and does not guarantee the accessibility of your web app, so manual testing is also encouraged.
Names and labels
Buttons do not have an accessible name
When a button doesn't have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers. Learn how to make buttons more accessible.
Failing Elements
button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-bxvbkv-MuiButtonBase-root-MuiIconButton-root
These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.
ARIA
[aria-hidden="true"] elements contain focusable descendents
Focusable descendents within an [aria-hidden="true"] element prevent those interactive elements from being available to users of assistive technologies like screen readers. Learn how aria-hidden affects focusable elements.
Failing Elements
div
button.go1767807125.go2902208695.go2279492678
These are opportunities to improve the usage of ARIA in your application which may enhance the experience for users of assistive technology, like a screen reader.
Contrast
Background and foreground colors do not have a sufficient contrast ratio.
Low-contrast text is difficult or impossible for many users to read. Learn how to provide sufficient color contrast.
Failing Elements
Class 1
<p class="MuiTypography-root MuiTypography-body1 css-vodilg-MuiTypography-root">
H Hindi Class 1
<div class="MuiBox-root css-1kccz5r" role="button" tabindex="0" aria-label="Hindi Class 1" fdprocessedid="to2cj">
Class 1
<p class="MuiTypography-root MuiTypography-body1 css-vodilg-MuiTypography-root">
E EVS Class 1
<div class="MuiBox-root css-r4n6iu" role="button" tabindex="0" aria-label="EVS Class 1" fdprocessedid="3ova9">
Class 1
<p class="MuiTypography-root MuiTypography-body1 css-vodilg-MuiTypography-root">
G General Class 1
<div class="MuiBox-root css-y5r0c0" role="button" tabindex="0" aria-label="General Class 1" fdprocessedid="llbdqi">
Class 6-8
<button tabindex="0" style="background: var(--color-pink); border: 2px solid var(--color-border);" fdprocessedid="of5wab">
Class 9-10
<button tabindex="0" style="background: var(--color-bg); border: 2px solid var(--color-border);" fdprocessedid="kul0okd">
Class 11-12
<button tabindex="0" style="background: var(--color-bg); border: 2px solid var(--color-border);" fdprocessedid="59mlf7k">
These are opportunities to improve the legibility of your content.
Tables and lists
Lists do not contain only <li> elements and script supporting elements (<script> and <template>).
Screen readers have a specific way of announcing lists. Ensuring proper list structure aids screen reader output. Learn more about proper list structure.
Failing Elements
Morning Assembly Formats GOI/KVS Rules Office Formats Time Table Templates …
<ul class="MuiList-root css-54zhjy-MuiList-root">
Morning Assembly Formats
<div class="MuiBox-root css-zw92nt" role="button" tabindex="0" aria-label="Morning Assembly Formats" fdprocessedid="33zd69">
GOI/KVS Rules
<div class="MuiBox-root css-zw92nt" role="button" tabindex="0" aria-label="GOI/KVS Rules" fdprocessedid="gpocih">
Office Formats
<div class="MuiBox-root css-zw92nt" role="button" tabindex="0" aria-label="Office Formats" fdprocessedid="820u69">
These are opportunities to improve the experience of reading tabular or list data using assistive technology, like a screen reader.
Best practices
Touch targets do not have sufficient size or spacing.
Touch targets with sufficient size and spacing help users who may have difficulty targeting small controls to activate the targets. Learn more about touch targets.
Failing Elements
button.MuiButtonBase-root.MuiBottomNavigationAction-root.Mui-selected.css-1m5ocxb-MuiButtonBase-root-MuiBottomNavigationAction-root
button.go1767807125.go2902208695.go2279492678
button.MuiButtonBase-root.MuiBottomNavigationAction-root.MuiBottomNavigationAction-iconOnly.css-4lm4ok-MuiButtonBase-root-MuiBottomNavigationAction-root
button.go1767807125.go2902208695.go2279492678