/*! (c) 2017 Andrea Giammarchi (ISC) */

/**
 * This code is a revisited port of the snabbdom vDOM diffing logic,
 * the same that fuels as fork Vue.js or other libraries.
 * @credits https://github.com/snabbdom/snabbdom
 */

const identity = O => O;

const domdiff = (
  parentNode,     // where changes happen
  currentNodes,   // Array of current items/nodes
  futureNodes,    // Array of future items/nodes
  getNode,        // optional way to retrieve a node from an item
  beforeNode      // optional item/node to use as insertBefore delimiter
) => {
  const get = getNode || identity;
  const before = beforeNode == null ? null : get(beforeNode, 0);
  let currentStart = 0, futureStart = 0;
  let currentEnd = currentNodes.length - 1;
  let currentStartNode = currentNodes[0];
  let currentEndNode = currentNodes[currentEnd];
  let futureEnd = futureNodes.length - 1;
  let futureStartNode = futureNodes[0];
  let futureEndNode = futureNodes[futureEnd];
  while (currentStart <= currentEnd && futureStart <= futureEnd) {
    if (currentStartNode == null) {
      currentStartNode = currentNodes[++currentStart];
    }
    else if (currentEndNode == null) {
      currentEndNode = currentNodes[--currentEnd];
    }
    else if (futureStartNode == null) {
      futureStartNode = futureNodes[++futureStart];
    }
    else if (futureEndNode == null) {
      futureEndNode = futureNodes[--futureEnd];
    }
    else if (currentStartNode == futureStartNode) {
      currentStartNode = currentNodes[++currentStart];
      futureStartNode = futureNodes[++futureStart];
    }
    else if (currentEndNode == futureEndNode) {
      currentEndNode = currentNodes[--currentEnd];
      futureEndNode = futureNodes[--futureEnd];
    }
    else if (currentStartNode == futureEndNode) {
      parentNode.insertBefore(
        get(currentStartNode, 1),
        get(currentEndNode, -0).nextSibling
      );
      currentStartNode = currentNodes[++currentStart];
      futureEndNode = futureNodes[--futureEnd];
    }
    else if (currentEndNode == futureStartNode) {
      parentNode.insertBefore(
        get(currentEndNode, 1),
        get(currentStartNode, 0)
      );
      currentEndNode = currentNodes[--currentEnd];
      futureStartNode = futureNodes[++futureStart];
    }
    else {
      let index = currentNodes.indexOf(futureStartNode);
      if (index < 0) {
        parentNode.insertBefore(
          get(futureStartNode, 1),
          get(currentStartNode, 0)
        );
        futureStartNode = futureNodes[++futureStart];
      }
      else {
        let el = currentNodes[index];
        currentNodes[index] = null;
        parentNode.insertBefore(
          get(el, 1),
          get(currentStartNode, 0)
        );
        futureStartNode = futureNodes[++futureStart];
      }
    }
  }
  if (currentStart > currentEnd) {
    if (futureStart <= futureEnd) {
      const pin = futureNodes[futureEnd + 1];
      const place = pin == null ? before : get(pin, 0);
      while (futureNodes[futureStart] == null) futureStart++;
      while (futureNodes[futureEnd] == null) futureEnd--;
      if (futureStart === futureEnd && futureNodes[futureStart] != null) {
        parentNode.insertBefore(get(futureNodes[futureStart], 1), place);
      }
      // ignore until I am sure the else could never happen.
      // it might be a vDOM thing 'cause it never happens here.
      /* istanbul ignore else */
      else if (futureStart < futureEnd) {
        const fragment = parentNode.ownerDocument.createDocumentFragment();
        while (futureStart <= futureEnd) {
          const node = futureNodes[futureStart++];
          // ignore until I am sure the else could never happen.
          // it might be a vDOM thing 'cause it never happens here.
          /* istanbul ignore else */
          if (node != null) fragment.appendChild(get(node, 1));
        }
        parentNode.insertBefore(fragment, place);
      }
    }
  }
  // ignore until I am sure the else could never happen.
  // it might be a vDOM thing 'cause it never happens here.
  /* istanbul ignore else */
  else if (futureStart > futureEnd && currentStart <= currentEnd) {
    while (currentNodes[currentStart] == null) currentStart++;
    while (currentNodes[currentEnd] == null) currentEnd--;
    if (currentStart === currentEnd && currentNodes[currentStart] != null) {
      parentNode.removeChild(get(currentNodes[currentStart], -1));
    }
    // ignore until I am sure the else could never happen.
    // it might be a vDOM thing 'cause it never happens here.
    /* istanbul ignore else */
    else if (currentStart < currentEnd) {
      const range = parentNode.ownerDocument.createRange();
      range.setStartBefore(get(currentNodes[currentStart], -1));
      range.setEndAfter(get(currentNodes[currentEnd], -1));
      range.deleteContents();
    }
  }
  return futureNodes;
};

export default domdiff;
