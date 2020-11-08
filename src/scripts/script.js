document.querySelector('#sort-max').onclick = sortMax;
document.querySelector('#sort-min').onclick = sortMin;
let products = document.querySelector('.main-container'),
  min = false,
  max = false;

function sortMax() {
  if (max == false) {
    let left = firstSwap = 0;
    let right = lastSwap = products.children.length - 1;
    while (left < right) {
      for (let i = left; i < right; i++) {
        if (+products.children[i].getAttribute('data-price') > +products.children[i + 1].getAttribute('data-price')) {
          replacedNode = products.replaceChild(products.children[i + 1], products.children[i]);
          insertAfter(replacedNode, products.children[i])
          lastSwap = i;
        }
      }
      right = lastSwap;
      for (let i = right; i > left; i--) {
        if (+products.children[i].getAttribute('data-price') < +products.children[i - 1].getAttribute('data-price')) {
          replacedNode = products.replaceChild(products.children[i], products.children[i - 1]);
          insertBefore(replacedNode, products.children[i])
          firstSwap = i;
        }
      }
      left = firstSwap;
    }
    max = true;
    min = false;
  }
}

function sortMin() {
  if (min == false) {
    let left = firstSwap = 0;
    let right = lastSwap = products.children.length - 1;
    while (left < right) {
      for (let i = left; i < right; i++) {
        if (+products.children[i].getAttribute('data-price') < +products.children[i + 1].getAttribute('data-price')) {
          replacedNode = products.replaceChild(products.children[i + 1], products.children[i]);
          insertAfter(replacedNode, products.children[i])
          lastSwap = i;
        }
      }
      right = lastSwap;
      for (let i = right; i > left; i--) {
        if (+products.children[i].getAttribute('data-price') > +products.children[i - 1].getAttribute('data-price')) {
          replacedNode = products.replaceChild(products.children[i], products.children[i - 1]);
          insertBefore(replacedNode, products.children[i])
          firstSwap = i;
        }
      }
      left = firstSwap;
    }
    max = false;
    min = true;
  }
}

function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
}

function insertBefore(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem)
}