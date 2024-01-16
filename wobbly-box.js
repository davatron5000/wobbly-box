class wobblyBox extends HTMLElement {
  constructor() {
    super();
    this.stroke = getComputedStyle(this).color || "currentColor";
    this.strokeWidth = 5;

    // Make wobbles
    this.blockWobble = Math.random() * 2 - 1;
    this.inlineWobble = Math.random() * 2 - 1;
    this.blockStartWobble = 5 + this.blockWobble * 7;
    this.blockEndWobble = 95 + this.blockWobble * 7;
    this.inlineStartWobble = 5 + this.inlineWobble * -7;
    this.inlineEndWobble = 95 + this.inlineWobble * 7;

    // Make paths
    this.blockStartPath = `M5,5 Q50,${this.blockStartWobble} 95,5`;
    this.blockEndPath = `M5,95 Q50,${this.blockEndWobble} 95,95`;
    this.inlineStartPath = `M5,5 Q${this.inlineStartWobble},50 5,95`;
    this.inlineEndPath = `M95,5 Q${this.inlineEndWobble},50 95,95`;

    // Make SVG
    // Note: xmlns is a load-bearing attribute, don't remove it
    this.svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"
        stroke="${this.stroke}"
        stroke-width="${this.strokeWidth}"
        fill="transparent"
        stroke-linecap="round"
      >
        <path d="${this.blockStartPath}" />
        <path d="${this.blockEndPath}" />
        <path d="${this.inlineStartPath}" />
        <path d="${this.inlineEndPath}" />
      </svg>
    `.replace(/\s+/g,' ').trim()
  }

  connectedCallback() {
    this.style.display = "block";
    this.style.border = `${this.strokeWidth}px solid transparent`;
    this.style.borderImage = `url('data:image/svg+xml,${this.svg}') ${this.strokeWidth * 2} / ${this.strokeWidth}px / ${this.strokeWidth}px stretch`;
  }
}

customElements.define("wobbly-box", wobblyBox);
