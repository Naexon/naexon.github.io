import TypeIt from "typeit";

import './style.css'

document.addEventListener("DOMContentLoaded", init);

/** Initialize app */
function init() {

  /** Get the blob element and let it follow the pointer */
  const blob = document.getElementById("blob")!;
  document.body.onpointermove = event => {
    const {x, y} = event;
    blob.animate({
      left: `${x}px`,
      top: `${y}px`
    }, { duration: 7000, fill: "forwards" });
  }

  const typed = new (TypeIt as any)("#typed", {
    strings: [],
  });
  // use .exec with an async function to awat button press
  typed.delete().type("Workflow").options({speed: 1000, lifeLike: true}).go();
  typed.reset();
  typed.delete().type("test2").options({speed: 1000, lifeLike: true}).go();

  /** Convert text of hacker-effect class elements and attach mouseover event listener */
  Array.from(document.getElementsByClassName("hacker-effect"))
    .filter((element): element is HTMLElement => element.textContent !== null) 
    .forEach(element => {
      
      /** Change text to upper case and save it as value to the dataset */
      const upperText = element.textContent!.toUpperCase();
      element.textContent = upperText;
      element.dataset.text = upperText;

      /** Add mouseover event listener */
      element.addEventListener("mouseover", hackerEffectEventHandler);
    });
}


/** Event handler for the hacker effect */
function hackerEffectEventHandler(this: HTMLElement, _ev: Event) {

  const originalText = this.dataset.text!;

  /** Iterate n times, where n is the length of the original text */
  let interations = 0;
  const interval = setInterval(() => {

    /** Iterate over all characters in the text */
    this.innerText = this.innerText.split("")
      .map((letter, index) => {

        /** Keep whitespaces to avoid weird line breaks in longer inputs */
        if (letter == " ") {
          return " ";
        }

        /** Depending on the iteration count, show the characters of the original text */
        if (index < interations) {
          return originalText[index];
        }

        /** Show a random upper case ASCII character */
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));

      }).join("");

      if (interations >= originalText.length) clearInterval(interval);

      interations += 1;
    
  /** Interval iterations happen every 1000 / x miliseconds, i.e. x times a second */
  }, 1000 / 50);
}
