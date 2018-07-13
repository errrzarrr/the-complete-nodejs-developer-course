# How to use node's debugger
> available from node v8.0

## from terminal
* run  `node inspect file.js` to start.
	* you can pass arguments as you normally do, `node inspect file.js read --title='the title'` 
	* you can `nodemon inspect [...]` too.
* type `n` to go to next instruction
* type `c` to continue straight up to the end of file or to the next breakpoint marked with `debugger;`.
* type `repl` to enter _repl_ mode
	* once into _debug_ mode you can go back and forth into _repl_ mode as many times as needed.

## from chrome dev tools 
* run  `node --inspect-blk file.js` to start.
* in chrome visit `chrome://inspect/#devices` -> _Open dedicated DevTools for Node_
	* Blue (`F8`) button works the same as `c`, continue exectution until a breakpoint is found.
	* `F10` button same as `n`
* Besides written breakpoints, you can put your own breakpoint in UI.