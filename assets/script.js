
const navItems = [
  ["Home","index.html"],["About","about.html#our-approach"],["Services","services.html#support-areas"],
  ["For Families","families.html#family-support"],["Careers","careers.html#opportunities"],["Contact","contact.html#enquiry"]
];
const current = location.pathname.split("/").pop() || "index.html";
const header = `
<header class="site-header"><div class="container nav-wrap">
<a class="brand" href="index.html" aria-label="WestsideHill ABA home"><img src="assets/bee-mark.svg" alt=""><span class="brand-name">WestsideHill<span>ABA</span></span></a>
<button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
<nav class="nav-links" aria-label="Main navigation">
${navItems.map(([label,url])=>{const active=current===url.split("#")[0];return `<a href="${url}" class="${active?'active':''}" ${active?'aria-current="page"':''}>${label}</a>`;}).join("")}
<button class="theme-toggle" type="button" aria-pressed="false" aria-label="Switch to dark theme"><span class="theme-toggle-icon" aria-hidden="true">☾</span><span class="theme-toggle-label">Dark mode</span></button>
<a class="btn small mobile-cta" href="contact.html#enquiry">Get in touch <span><svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15M13 5l7 7-7 7"/></svg></span></a>
</nav><a class="btn small nav-cta" href="contact.html#enquiry">Get in touch <span><svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15M13 5l7 7-7 7"/></svg></span></a>
</div></header>`;
const footer = `
<footer class="site-footer"><div class="container">
<div class="footer-grid">
<div class="footer-brand-col"><a class="footer-brand" href="index.html"><img src="assets/bee-mark.svg" alt=""><span class="brand-name">WestsideHill<span>ABA</span></span></a><p>Compassionate, individualised care that helps make room for meaningful progress.</p><a class="footer-contact-link" href="contact.html#enquiry"><span>Have a question? Let’s talk</span><svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15M13 5l7 7-7 7"/></svg></a></div>
<div class="footer-link-col"><h4>Explore</h4><div class="footer-links"><a href="about.html#our-approach">About us</a><a href="services.html#support-areas">Our services</a><a href="families.html#family-support">For families</a><a href="careers.html#opportunities">Careers</a></div></div>
<div class="footer-link-col"><h4>Get started</h4><div class="footer-links"><a href="contact.html#enquiry">Contact our team</a><a href="services.html#support-areas">Ask about services</a><a href="families.html#common-questions">Family questions</a></div></div>
<div class="footer-contact-card"><span class="footer-card-label">A good place to begin</span><h3>Let’s find your next step.</h3><a class="footer-email" href="mailto:hello@westsidehillaba.com"><span class="footer-contact-icon">✉</span><span><small>Email our team</small>hello@westsidehillaba.com</span></a><p>Phone and service area details can be confirmed with WestsideHill ABA.</p></div>
</div>
<div class="footer-bottom"><span>© <span id="year"></span> WestsideHill ABA. All rights reserved.</span><span class="footer-signoff"><span class="footer-spark">✳</span> Care that meets each person where they are.</span></div>
</div></footer>`;
document.querySelector("#site-header").innerHTML = header;
document.querySelector("#site-footer").innerHTML = footer;
document.querySelector("#year").textContent = new Date().getFullYear();
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const setTheme = theme => {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed",String(dark));
  themeToggle.setAttribute("aria-label",dark?"Switch to light theme":"Switch to dark theme");
  themeToggle.querySelector(".theme-toggle-icon").textContent = dark ? "☼" : "☾";
  themeToggle.querySelector(".theme-toggle-label").textContent = dark ? "Light mode" : "Dark mode";
  if(themeColor)themeColor.content = dark ? "#101C1A" : "#E6F4ED";
};
setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
themeToggle.addEventListener("click",()=>{const next=document.documentElement.dataset.theme === "dark" ? "light" : "dark";setTheme(next);try{localStorage.setItem("westsidehill-theme",next);}catch(error){}});
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const closeMenu = () => { nav.classList.remove("open"); toggle.classList.remove("is-open"); toggle.setAttribute("aria-expanded","false"); toggle.setAttribute("aria-label","Open navigation"); document.body.classList.remove("menu-open"); };
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.classList.toggle("is-open",open);toggle.setAttribute("aria-expanded",open);toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");document.body.classList.toggle("menu-open",open);});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
document.addEventListener("click",e=>{if(!e.target.closest(".nav-wrap"))closeMenu();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});
window.addEventListener("resize",()=>{if(window.innerWidth>900)closeMenu();},{passive:true});
const siteHeader = document.querySelector(".site-header");
const updateHeader = () => siteHeader.classList.toggle("is-scrolled",window.scrollY>16);
updateHeader();window.addEventListener("scroll",updateHeader,{passive:true});
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
const staggerGroups = ["cards","bento-grid","journey-steps","values-grid","steps"];
document.querySelectorAll(".reveal,.cards>.card,.values-grid>.value,.service-row,.steps>.step,.faq-item").forEach(el=>{
  if(!el.classList.contains("reveal"))el.classList.add("reveal");
  const parent=el.parentElement;
  const isStaggered=staggerGroups.some(group=>parent.classList.contains(group));
  const siblingIndex=isStaggered?Array.from(parent.children).indexOf(el):0;
  el.style.setProperty("--reveal-delay",`${Math.min(siblingIndex,4)*90}ms`);
  observer.observe(el);
});
document.querySelectorAll(".faq-q").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".faq-item");item.classList.toggle("open");btn.setAttribute("aria-expanded",item.classList.contains("open"));}));
document.querySelectorAll("form[data-demo-form]").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const status=form.querySelector(".form-status");status.textContent="Thanks — this demo form is ready to connect to the organisation's email or CRM. No message has been sent yet.";status.hidden=false;form.reset();}));
