var domdiff=function(){"use strict";/*! (c) 2017 Andrea Giammarchi (ISC) */
var e=function(e){return e},n=function(e,n,r,l){if(null==l)n.removeChild(e(r,-1));else{var i=n.ownerDocument.createRange();i.setStartBefore(e(r,-1)),i.setEndAfter(e(l,-1)),i.deleteContents()}};return function(r,l,i,t,f,o){for(var s=t||e,u=null==f?null:s(f,0),a=o||function(e,n){return e===n},v=0,c=0,d=l.length-1,m=l[0],B=l[d],h=i.length-1,g=i[0],C=i[h];v<=d&&c<=h;)if(null==m)m=l[++v];else if(null==B)B=l[--d];else if(null==g)g=i[++c];else if(null==C)C=i[--h];else if(a(m,g))m=l[++v],g=i[++c];else if(a(B,C))B=l[--d],C=i[--h];else if(a(m,C))r.insertBefore(s(m,1),s(B,-0).nextSibling),m=l[++v],C=i[--h];else if(a(B,g))r.insertBefore(s(B,1),s(m,0)),B=l[--d],g=i[++c];else{var D=l.indexOf(g);if(D<0)r.insertBefore(s(g,1),s(m,0)),g=i[++c];else{for(var p=D,w=c;p<=d&&w<=h&&a(l[p],i[w]);)p++,w++;if(1<p-D)--D===v?r.removeChild(s(m,-1)):n(s,r,m,l[D]),v=p,c=w,m=l[p],g=i[w];else{var x=l[D];l[D]=null,r.insertBefore(s(x,1),s(m,0)),g=i[++c]}}}if(v<=d||c<=h)if(v>d){var S=i[h+1],b=null==S?u:s(S,0);if(c===h)r.insertBefore(s(i[c],1),b);else{for(var A=r.ownerDocument.createDocumentFragment();c<=h;)A.appendChild(s(i[c++],1));r.insertBefore(A,b)}}else null==l[v]&&v++,v===d?r.removeChild(s(l[v],-1)):n(s,r,l[v],l[d]);return i}}();