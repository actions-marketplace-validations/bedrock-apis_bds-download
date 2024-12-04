import { createRequire } from "module";
import { exit } from "node:process";
import { platform } from "node:os";
import { pipeline } from "node:stream/promises";

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ createRequire(import.meta.url);

//#endregion
//#region src/constants.ts
const LINK_BDS_VERSIONS = "https://raw.githubusercontent.com/Bedrock-OSS/BDS-Versions/main/versions.json";
const LINK_BDS_CDN = `https://www.minecraft.net/bedrockdedicatedserver`;
const OS = platform();
const REQUESTED_VERSION = process.env["INPUT_VERSION"];
const USE_PREVIEW = process.env["INPUT_USE-PREVIEW"]?.toLocaleLowerCase() === "true";
const OUT_DIR = process.env["INPUT_OUT-DIR"];

//#endregion
//#region node_modules/traverse/index.js
var require_traverse = __commonJS({ "node_modules/traverse/index.js"(exports, module) {
	module.exports = Traverse$1;
	function Traverse$1(obj) {
		if (!(this instanceof Traverse$1)) return new Traverse$1(obj);
		this.value = obj;
	}
	Traverse$1.prototype.get = function(ps) {
		var node = this.value;
		for (var i = 0; i < ps.length; i++) {
			var key = ps[i];
			if (!Object.hasOwnProperty.call(node, key)) {
				node = undefined;
				break;
			}
			node = node[key];
		}
		return node;
	};
	Traverse$1.prototype.set = function(ps, value) {
		var node = this.value;
		for (var i = 0; i < ps.length - 1; i++) {
			var key = ps[i];
			if (!Object.hasOwnProperty.call(node, key)) node[key] = {};
			node = node[key];
		}
		node[ps[i]] = value;
		return value;
	};
	Traverse$1.prototype.map = function(cb) {
		return walk(this.value, cb, true);
	};
	Traverse$1.prototype.forEach = function(cb) {
		this.value = walk(this.value, cb, false);
		return this.value;
	};
	Traverse$1.prototype.reduce = function(cb, init) {
		var skip = arguments.length === 1;
		var acc = skip ? this.value : init;
		this.forEach(function(x) {
			if (!this.isRoot || !skip) acc = cb.call(this, acc, x);
		});
		return acc;
	};
	Traverse$1.prototype.deepEqual = function(obj) {
		if (arguments.length !== 1) throw new Error("deepEqual requires exactly one object to compare against");
		var equal = true;
		var node = obj;
		this.forEach(function(y) {
			var notEqual = function() {
				equal = false;
				return undefined;
			}.bind(this);
			if (!this.isRoot) {
				if (typeof node !== "object") return notEqual();
				node = node[this.key];
			}
			var x = node;
			this.post(function() {
				node = x;
			});
			var toS = function(o) {
				return Object.prototype.toString.call(o);
			};
			if (this.circular) {
				if (Traverse$1(obj).get(this.circular.path) !== x) notEqual();
			} else if (typeof x !== typeof y) notEqual();
else if (x === null || y === null || x === undefined || y === undefined) {
				if (x !== y) notEqual();
			} else if (x.__proto__ !== y.__proto__) notEqual();
else if (x === y) {} else if (typeof x === "function") {
				if (x instanceof RegExp) {
					if (x.toString() != y.toString()) notEqual();
				} else if (x !== y) notEqual();
			} else if (typeof x === "object") if (toS(y) === "[object Arguments]" || toS(x) === "[object Arguments]") {
				if (toS(x) !== toS(y)) notEqual();
			} else if (x instanceof Date || y instanceof Date) {
				if (!(x instanceof Date) || !(y instanceof Date) || x.getTime() !== y.getTime()) notEqual();
			} else {
				var kx = Object.keys(x);
				var ky = Object.keys(y);
				if (kx.length !== ky.length) return notEqual();
				for (var i = 0; i < kx.length; i++) {
					var k = kx[i];
					if (!Object.hasOwnProperty.call(y, k)) notEqual();
				}
			}
		});
		return equal;
	};
	Traverse$1.prototype.paths = function() {
		var acc = [];
		this.forEach(function(x) {
			acc.push(this.path);
		});
		return acc;
	};
	Traverse$1.prototype.nodes = function() {
		var acc = [];
		this.forEach(function(x) {
			acc.push(this.node);
		});
		return acc;
	};
	Traverse$1.prototype.clone = function() {
		var parents = [], nodes = [];
		return function clone(src) {
			for (var i = 0; i < parents.length; i++) if (parents[i] === src) return nodes[i];
			if (typeof src === "object" && src !== null) {
				var dst = copy(src);
				parents.push(src);
				nodes.push(dst);
				Object.keys(src).forEach(function(key) {
					dst[key] = clone(src[key]);
				});
				parents.pop();
				nodes.pop();
				return dst;
			} else return src;
		}(this.value);
	};
	function walk(root, cb, immutable) {
		var path$2 = [];
		var parents = [];
		var alive = true;
		return function walker(node_) {
			var node = immutable ? copy(node_) : node_;
			var modifiers = {};
			var state = {
				node,
				node_,
				path: [].concat(path$2),
				parent: parents.slice(-1)[0],
				key: path$2.slice(-1)[0],
				isRoot: path$2.length === 0,
				level: path$2.length,
				circular: null,
				update: function(x) {
					if (!state.isRoot) state.parent.node[state.key] = x;
					state.node = x;
				},
				"delete": function() {
					delete state.parent.node[state.key];
				},
				remove: function() {
					if (Array.isArray(state.parent.node)) state.parent.node.splice(state.key, 1);
else delete state.parent.node[state.key];
				},
				before: function(f) {
					modifiers.before = f;
				},
				after: function(f) {
					modifiers.after = f;
				},
				pre: function(f) {
					modifiers.pre = f;
				},
				post: function(f) {
					modifiers.post = f;
				},
				stop: function() {
					alive = false;
				}
			};
			if (!alive) return state;
			if (typeof node === "object" && node !== null) {
				state.isLeaf = Object.keys(node).length == 0;
				for (var i = 0; i < parents.length; i++) if (parents[i].node_ === node_) {
					state.circular = parents[i];
					break;
				}
			} else state.isLeaf = true;
			state.notLeaf = !state.isLeaf;
			state.notRoot = !state.isRoot;
			var ret = cb.call(state, state.node);
			if (ret !== undefined && state.update) state.update(ret);
			if (modifiers.before) modifiers.before.call(state, state.node);
			if (typeof state.node == "object" && state.node !== null && !state.circular) {
				parents.push(state);
				var keys = Object.keys(state.node);
				keys.forEach(function(key, i$1) {
					path$2.push(key);
					if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
					var child = walker(state.node[key]);
					if (immutable && Object.hasOwnProperty.call(state.node, key)) state.node[key] = child.node;
					child.isLast = i$1 == keys.length - 1;
					child.isFirst = i$1 == 0;
					if (modifiers.post) modifiers.post.call(state, child);
					path$2.pop();
				});
				parents.pop();
			}
			if (modifiers.after) modifiers.after.call(state, state.node);
			return state;
		}(root).node;
	}
	Object.keys(Traverse$1.prototype).forEach(function(key) {
		Traverse$1[key] = function(obj) {
			var args = [].slice.call(arguments, 1);
			var t = Traverse$1(obj);
			return t[key].apply(t, args);
		};
	});
	function copy(src) {
		if (typeof src === "object" && src !== null) {
			var dst;
			if (Array.isArray(src)) dst = [];
else if (src instanceof Date) dst = new Date(src);
else if (src instanceof Boolean) dst = new Boolean(src);
else if (src instanceof Number) dst = new Number(src);
else if (src instanceof String) dst = new String(src);
else dst = Object.create(Object.getPrototypeOf(src));
			Object.keys(src).forEach(function(key) {
				dst[key] = src[key];
			});
			return dst;
		} else return src;
	}
} });

//#endregion
//#region node_modules/chainsaw/index.js
var require_chainsaw = __commonJS({ "node_modules/chainsaw/index.js"(exports, module) {
	var Traverse = require_traverse();
	var EventEmitter$1 = __require("events").EventEmitter;
	module.exports = Chainsaw$1;
	function Chainsaw$1(builder) {
		var saw = Chainsaw$1.saw(builder, {});
		var r = builder.call(saw.handlers, saw);
		if (r !== undefined) saw.handlers = r;
		saw.record();
		return saw.chain();
	}
	Chainsaw$1.light = function ChainsawLight(builder) {
		var saw = Chainsaw$1.saw(builder, {});
		var r = builder.call(saw.handlers, saw);
		if (r !== undefined) saw.handlers = r;
		return saw.chain();
	};
	Chainsaw$1.saw = function(builder, handlers) {
		var saw = new EventEmitter$1();
		saw.handlers = handlers;
		saw.actions = [];
		saw.chain = function() {
			var ch = Traverse(saw.handlers).map(function(node) {
				if (this.isRoot) return node;
				var ps = this.path;
				if (typeof node === "function") this.update(function() {
					saw.actions.push({
						path: ps,
						args: [].slice.call(arguments)
					});
					return ch;
				});
			});
			process.nextTick(function() {
				saw.emit("begin");
				saw.next();
			});
			return ch;
		};
		saw.pop = function() {
			return saw.actions.shift();
		};
		saw.next = function() {
			var action = saw.pop();
			if (!action) saw.emit("end");
else if (!action.trap) {
				var node = saw.handlers;
				action.path.forEach(function(key) {
					node = node[key];
				});
				node.apply(saw.handlers, action.args);
			}
		};
		saw.nest = function(cb) {
			var args = [].slice.call(arguments, 1);
			var autonext = true;
			if (typeof cb === "boolean") {
				var autonext = cb;
				cb = args.shift();
			}
			var s = Chainsaw$1.saw(builder, {});
			var r = builder.call(s.handlers, s);
			if (r !== undefined) s.handlers = r;
			if ("undefined" !== typeof saw.step) s.record();
			cb.apply(s.chain(), args);
			if (autonext !== false) s.on("end", saw.next);
		};
		saw.record = function() {
			upgradeChainsaw(saw);
		};
		[
			"trap",
			"down",
			"jump"
		].forEach(function(method) {
			saw[method] = function() {
				throw new Error("To use the trap, down and jump features, please call record() first to start recording actions.");
			};
		});
		return saw;
	};
	function upgradeChainsaw(saw) {
		saw.step = 0;
		saw.pop = function() {
			return saw.actions[saw.step++];
		};
		saw.trap = function(name, cb) {
			var ps = Array.isArray(name) ? name : [name];
			saw.actions.push({
				path: ps,
				step: saw.step,
				cb,
				trap: true
			});
		};
		saw.down = function(name) {
			var ps = (Array.isArray(name) ? name : [name]).join("/");
			var i = saw.actions.slice(saw.step).map(function(x) {
				if (x.trap && x.step <= saw.step) return false;
				return x.path.join("/") == ps;
			}).indexOf(true);
			if (i >= 0) saw.step += i;
else saw.step = saw.actions.length;
			var act = saw.actions[saw.step - 1];
			if (act && act.trap) {
				saw.step = act.step;
				act.cb();
			} else saw.next();
		};
		saw.jump = function(step) {
			saw.step = step;
			saw.next();
		};
	}
} });

//#endregion
//#region node_modules/buffers/index.js
var require_buffers = __commonJS({ "node_modules/buffers/index.js"(exports, module) {
	module.exports = Buffers$1;
	function Buffers$1(bufs) {
		if (!(this instanceof Buffers$1)) return new Buffers$1(bufs);
		this.buffers = bufs || [];
		this.length = this.buffers.reduce(function(size, buf) {
			return size + buf.length;
		}, 0);
	}
	Buffers$1.prototype.push = function() {
		for (var i = 0; i < arguments.length; i++) if (!Buffer.isBuffer(arguments[i])) throw new TypeError("Tried to push a non-buffer");
		for (var i = 0; i < arguments.length; i++) {
			var buf = arguments[i];
			this.buffers.push(buf);
			this.length += buf.length;
		}
		return this.length;
	};
	Buffers$1.prototype.unshift = function() {
		for (var i = 0; i < arguments.length; i++) if (!Buffer.isBuffer(arguments[i])) throw new TypeError("Tried to unshift a non-buffer");
		for (var i = 0; i < arguments.length; i++) {
			var buf = arguments[i];
			this.buffers.unshift(buf);
			this.length += buf.length;
		}
		return this.length;
	};
	Buffers$1.prototype.copy = function(dst, dStart, start, end) {
		return this.slice(start, end).copy(dst, dStart, 0, end - start);
	};
	Buffers$1.prototype.splice = function(i, howMany) {
		var buffers = this.buffers;
		var index = i >= 0 ? i : this.length - i;
		var reps = [].slice.call(arguments, 2);
		if (howMany === undefined) howMany = this.length - index;
else if (howMany > this.length - index) howMany = this.length - index;
		for (var i = 0; i < reps.length; i++) this.length += reps[i].length;
		var removed = new Buffers$1();
		var bytes = 0;
		var startBytes = 0;
		for (var ii = 0; ii < buffers.length && startBytes + buffers[ii].length < index; ii++) startBytes += buffers[ii].length;
		if (index - startBytes > 0) {
			var start = index - startBytes;
			if (start + howMany < buffers[ii].length) {
				removed.push(buffers[ii].slice(start, start + howMany));
				var orig = buffers[ii];
				var buf0 = new Buffer(start);
				for (var i = 0; i < start; i++) buf0[i] = orig[i];
				var buf1 = new Buffer(orig.length - start - howMany);
				for (var i = start + howMany; i < orig.length; i++) buf1[i - howMany - start] = orig[i];
				if (reps.length > 0) {
					var reps_ = reps.slice();
					reps_.unshift(buf0);
					reps_.push(buf1);
					buffers.splice.apply(buffers, [ii, 1].concat(reps_));
					ii += reps_.length;
					reps = [];
				} else {
					buffers.splice(ii, 1, buf0, buf1);
					ii += 2;
				}
			} else {
				removed.push(buffers[ii].slice(start));
				buffers[ii] = buffers[ii].slice(0, start);
				ii++;
			}
		}
		if (reps.length > 0) {
			buffers.splice.apply(buffers, [ii, 0].concat(reps));
			ii += reps.length;
		}
		while (removed.length < howMany) {
			var buf = buffers[ii];
			var len = buf.length;
			var take = Math.min(len, howMany - removed.length);
			if (take === len) {
				removed.push(buf);
				buffers.splice(ii, 1);
			} else {
				removed.push(buf.slice(0, take));
				buffers[ii] = buffers[ii].slice(take);
			}
		}
		this.length -= removed.length;
		return removed;
	};
	Buffers$1.prototype.slice = function(i, j) {
		var buffers = this.buffers;
		if (j === undefined) j = this.length;
		if (i === undefined) i = 0;
		if (j > this.length) j = this.length;
		var startBytes = 0;
		for (var si = 0; si < buffers.length && startBytes + buffers[si].length <= i; si++) startBytes += buffers[si].length;
		var target = new Buffer(j - i);
		var ti = 0;
		for (var ii = si; ti < j - i && ii < buffers.length; ii++) {
			var len = buffers[ii].length;
			var start = ti === 0 ? i - startBytes : 0;
			var end = ti + len >= j - i ? Math.min(start + (j - i) - ti, len) : len;
			buffers[ii].copy(target, ti, start, end);
			ti += end - start;
		}
		return target;
	};
	Buffers$1.prototype.pos = function(i) {
		if (i < 0 || i >= this.length) throw new Error("oob");
		var l = i, bi = 0, bu = null;
		for (;;) {
			bu = this.buffers[bi];
			if (l < bu.length) return {
				buf: bi,
				offset: l
			};
else l -= bu.length;
			bi++;
		}
	};
	Buffers$1.prototype.get = function get(i) {
		var pos = this.pos(i);
		return this.buffers[pos.buf].get(pos.offset);
	};
	Buffers$1.prototype.set = function set(i, b) {
		var pos = this.pos(i);
		return this.buffers[pos.buf].set(pos.offset, b);
	};
	Buffers$1.prototype.indexOf = function(needle, offset) {
		if ("string" === typeof needle) needle = new Buffer(needle);
else if (needle instanceof Buffer) {} else throw new Error("Invalid type for a search string");
		if (!needle.length) return 0;
		if (!this.length) return -1;
		var i = 0, j = 0, match = 0, mstart, pos = 0;
		if (offset) {
			var p = this.pos(offset);
			i = p.buf;
			j = p.offset;
			pos = offset;
		}
		for (;;) {
			while (j >= this.buffers[i].length) {
				j = 0;
				i++;
				if (i >= this.buffers.length) return -1;
			}
			var char = this.buffers[i][j];
			if (char == needle[match]) {
				if (match == 0) mstart = {
					i,
					j,
					pos
				};
				match++;
				if (match == needle.length) return mstart.pos;
			} else if (match != 0) {
				i = mstart.i;
				j = mstart.j;
				pos = mstart.pos;
				match = 0;
			}
			j++;
			pos++;
		}
	};
	Buffers$1.prototype.toBuffer = function() {
		return this.slice();
	};
	Buffers$1.prototype.toString = function(encoding, start, end) {
		return this.slice(start, end).toString(encoding);
	};
} });

//#endregion
//#region node_modules/binary/lib/vars.js
var require_vars = __commonJS({ "node_modules/binary/lib/vars.js"(exports, module) {
	module.exports = function(store) {
		function getset(name, value) {
			var node = vars.store;
			var keys = name.split(".");
			keys.slice(0, -1).forEach(function(k) {
				if (node[k] === undefined) node[k] = {};
				node = node[k];
			});
			var key = keys[keys.length - 1];
			if (arguments.length == 1) return node[key];
else return node[key] = value;
		}
		var vars = {
			get: function(name) {
				return getset(name);
			},
			set: function(name, value) {
				return getset(name, value);
			},
			store: store || {}
		};
		return vars;
	};
} });

//#endregion
//#region node_modules/binary/index.js
var require_binary = __commonJS({ "node_modules/binary/index.js"(exports, module) {
	var Chainsaw = require_chainsaw();
	var EventEmitter = __require("events").EventEmitter;
	var Buffers = require_buffers();
	var Vars = require_vars();
	var Stream = __require("stream").Stream;
	exports = module.exports = function(bufOrEm, eventName) {
		if (Buffer.isBuffer(bufOrEm)) return exports.parse(bufOrEm);
		var s = exports.stream();
		if (bufOrEm && bufOrEm.pipe) bufOrEm.pipe(s);
else if (bufOrEm) {
			bufOrEm.on(eventName || "data", function(buf) {
				s.write(buf);
			});
			bufOrEm.on("end", function() {
				s.end();
			});
		}
		return s;
	};
	exports.stream = function(input) {
		if (input) return exports.apply(null, arguments);
		var pending = null;
		function getBytes(bytes, cb, skip) {
			pending = {
				bytes,
				skip,
				cb: function(buf) {
					pending = null;
					cb(buf);
				}
			};
			dispatch();
		}
		var offset = null;
		function dispatch() {
			if (!pending) {
				if (caughtEnd) done = true;
				return;
			}
			if (typeof pending === "function") pending();
else {
				var bytes = offset + pending.bytes;
				if (buffers.length >= bytes) {
					var buf;
					if (offset == null) {
						buf = buffers.splice(0, bytes);
						if (!pending.skip) buf = buf.slice();
					} else {
						if (!pending.skip) buf = buffers.slice(offset, bytes);
						offset = bytes;
					}
					if (pending.skip) pending.cb();
else pending.cb(buf);
				}
			}
		}
		function builder(saw) {
			function next() {
				if (!done) saw.next();
			}
			var self = words(function(bytes, cb) {
				return function(name) {
					getBytes(bytes, function(buf) {
						vars.set(name, cb(buf));
						next();
					});
				};
			});
			self.tap = function(cb) {
				saw.nest(cb, vars.store);
			};
			self.into = function(key, cb) {
				if (!vars.get(key)) vars.set(key, {});
				var parent = vars;
				vars = Vars(parent.get(key));
				saw.nest(function() {
					cb.apply(this, arguments);
					this.tap(function() {
						vars = parent;
					});
				}, vars.store);
			};
			self.flush = function() {
				vars.store = {};
				next();
			};
			self.loop = function(cb) {
				var end = false;
				saw.nest(false, function loop() {
					this.vars = vars.store;
					cb.call(this, function() {
						end = true;
						next();
					}, vars.store);
					this.tap(function() {
						if (end) saw.next();
else loop.call(this);
					}.bind(this));
				}, vars.store);
			};
			self.buffer = function(name, bytes) {
				if (typeof bytes === "string") bytes = vars.get(bytes);
				getBytes(bytes, function(buf) {
					vars.set(name, buf);
					next();
				});
			};
			self.skip = function(bytes) {
				if (typeof bytes === "string") bytes = vars.get(bytes);
				getBytes(bytes, function() {
					next();
				});
			};
			self.scan = function find(name, search) {
				if (typeof search === "string") search = new Buffer(search);
else if (!Buffer.isBuffer(search)) throw new Error("search must be a Buffer or a string");
				var taken = 0;
				pending = function() {
					var pos = buffers.indexOf(search, offset + taken);
					var i = pos - offset - taken;
					if (pos !== -1) {
						pending = null;
						if (offset != null) {
							vars.set(name, buffers.slice(offset, offset + taken + i));
							offset += taken + i + search.length;
						} else {
							vars.set(name, buffers.slice(0, taken + i));
							buffers.splice(0, taken + i + search.length);
						}
						next();
						dispatch();
					} else i = Math.max(buffers.length - search.length - offset - taken, 0);
					taken += i;
				};
				dispatch();
			};
			self.peek = function(cb) {
				offset = 0;
				saw.nest(function() {
					cb.call(this, vars.store);
					this.tap(function() {
						offset = null;
					});
				});
			};
			return self;
		}
		var stream$2 = Chainsaw.light(builder);
		stream$2.writable = true;
		var buffers = Buffers();
		stream$2.write = function(buf) {
			buffers.push(buf);
			dispatch();
		};
		var vars = Vars();
		var done = false, caughtEnd = false;
		stream$2.end = function() {
			caughtEnd = true;
		};
		stream$2.pipe = Stream.prototype.pipe;
		Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function(name) {
			stream$2[name] = EventEmitter.prototype[name];
		});
		return stream$2;
	};
	exports.parse = function parse(buffer) {
		var self = words(function(bytes, cb) {
			return function(name) {
				if (offset + bytes <= buffer.length) {
					var buf = buffer.slice(offset, offset + bytes);
					offset += bytes;
					vars.set(name, cb(buf));
				} else vars.set(name, null);
				return self;
			};
		});
		var offset = 0;
		var vars = Vars();
		self.vars = vars.store;
		self.tap = function(cb) {
			cb.call(self, vars.store);
			return self;
		};
		self.into = function(key, cb) {
			if (!vars.get(key)) vars.set(key, {});
			var parent = vars;
			vars = Vars(parent.get(key));
			cb.call(self, vars.store);
			vars = parent;
			return self;
		};
		self.loop = function(cb) {
			var end = false;
			var ender = function() {
				end = true;
			};
			while (end === false) cb.call(self, ender, vars.store);
			return self;
		};
		self.buffer = function(name, size) {
			if (typeof size === "string") size = vars.get(size);
			var buf = buffer.slice(offset, Math.min(buffer.length, offset + size));
			offset += size;
			vars.set(name, buf);
			return self;
		};
		self.skip = function(bytes) {
			if (typeof bytes === "string") bytes = vars.get(bytes);
			offset += bytes;
			return self;
		};
		self.scan = function(name, search) {
			if (typeof search === "string") search = new Buffer(search);
else if (!Buffer.isBuffer(search)) throw new Error("search must be a Buffer or a string");
			vars.set(name, null);
			for (var i = 0; i + offset <= buffer.length - search.length + 1; i++) {
				for (var j = 0; j < search.length && buffer[offset + i + j] === search[j]; j++);
				if (j === search.length) break;
			}
			vars.set(name, buffer.slice(offset, offset + i));
			offset += i + search.length;
			return self;
		};
		self.peek = function(cb) {
			var was = offset;
			cb.call(self, vars.store);
			offset = was;
			return self;
		};
		self.flush = function() {
			vars.store = {};
			return self;
		};
		self.eof = function() {
			return offset >= buffer.length;
		};
		return self;
	};
	function decodeLEu(bytes) {
		var acc = 0;
		for (var i = 0; i < bytes.length; i++) acc += Math.pow(256, i) * bytes[i];
		return acc;
	}
	function decodeBEu(bytes) {
		var acc = 0;
		for (var i = 0; i < bytes.length; i++) acc += Math.pow(256, bytes.length - i - 1) * bytes[i];
		return acc;
	}
	function decodeBEs(bytes) {
		var val = decodeBEu(bytes);
		if ((bytes[0] & 128) == 128) val -= Math.pow(256, bytes.length);
		return val;
	}
	function decodeLEs(bytes) {
		var val = decodeLEu(bytes);
		if ((bytes[bytes.length - 1] & 128) == 128) val -= Math.pow(256, bytes.length);
		return val;
	}
	function words(decode) {
		var self = {};
		[
			1,
			2,
			4,
			8
		].forEach(function(bytes) {
			var bits = bytes * 8;
			self["word" + bits + "le"] = self["word" + bits + "lu"] = decode(bytes, decodeLEu);
			self["word" + bits + "ls"] = decode(bytes, decodeLEs);
			self["word" + bits + "be"] = self["word" + bits + "bu"] = decode(bytes, decodeBEu);
			self["word" + bits + "bs"] = decode(bytes, decodeBEs);
		});
		self.word8 = self.word8u = self.word8be;
		self.word8s = self.word8bs;
		return self;
	}
} });

//#endregion
//#region node_modules/unzip-stream/lib/matcher-stream.js
var require_matcher_stream = __commonJS({ "node_modules/unzip-stream/lib/matcher-stream.js"(exports, module) {
	var Transform$2 = __require("stream").Transform;
	var util$3 = __require("util");
	function MatcherStream$1(patternDesc, matchFn) {
		if (!(this instanceof MatcherStream$1)) return new MatcherStream$1();
		Transform$2.call(this);
		var p = typeof patternDesc === "object" ? patternDesc.pattern : patternDesc;
		this.pattern = Buffer.isBuffer(p) ? p : Buffer.from(p);
		this.requiredLength = this.pattern.length;
		if (patternDesc.requiredExtraSize) this.requiredLength += patternDesc.requiredExtraSize;
		this.data = new Buffer("");
		this.bytesSoFar = 0;
		this.matchFn = matchFn;
	}
	util$3.inherits(MatcherStream$1, Transform$2);
	MatcherStream$1.prototype.checkDataChunk = function(ignoreMatchZero) {
		var enoughData = this.data.length >= this.requiredLength;
		if (!enoughData) return;
		var matchIndex = this.data.indexOf(this.pattern, ignoreMatchZero ? 1 : 0);
		if (matchIndex >= 0 && matchIndex + this.requiredLength > this.data.length) {
			if (matchIndex > 0) {
				var packet = this.data.slice(0, matchIndex);
				this.push(packet);
				this.bytesSoFar += matchIndex;
				this.data = this.data.slice(matchIndex);
			}
			return;
		}
		if (matchIndex === -1) {
			var packetLen = this.data.length - this.requiredLength + 1;
			var packet = this.data.slice(0, packetLen);
			this.push(packet);
			this.bytesSoFar += packetLen;
			this.data = this.data.slice(packetLen);
			return;
		}
		if (matchIndex > 0) {
			var packet = this.data.slice(0, matchIndex);
			this.data = this.data.slice(matchIndex);
			this.push(packet);
			this.bytesSoFar += matchIndex;
		}
		var finished = this.matchFn ? this.matchFn(this.data, this.bytesSoFar) : true;
		if (finished) {
			this.data = new Buffer("");
			return;
		}
		return true;
	};
	MatcherStream$1.prototype._transform = function(chunk, encoding, cb) {
		this.data = Buffer.concat([this.data, chunk]);
		var firstIteration = true;
		while (this.checkDataChunk(!firstIteration)) firstIteration = false;
		cb();
	};
	MatcherStream$1.prototype._flush = function(cb) {
		if (this.data.length > 0) {
			var firstIteration = true;
			while (this.checkDataChunk(!firstIteration)) firstIteration = false;
		}
		if (this.data.length > 0) {
			this.push(this.data);
			this.data = null;
		}
		cb();
	};
	module.exports = MatcherStream$1;
} });

//#endregion
//#region node_modules/unzip-stream/lib/entry.js
var require_entry = __commonJS({ "node_modules/unzip-stream/lib/entry.js"(exports, module) {
	var stream$1 = __require("stream");
	var inherits = __require("util").inherits;
	function Entry$1() {
		if (!(this instanceof Entry$1)) return new Entry$1();
		stream$1.PassThrough.call(this);
		this.path = null;
		this.type = null;
		this.isDirectory = false;
	}
	inherits(Entry$1, stream$1.PassThrough);
	Entry$1.prototype.autodrain = function() {
		return this.pipe(new stream$1.Transform({ transform: function(d, e, cb) {
			cb();
		} }));
	};
	module.exports = Entry$1;
} });

//#endregion
//#region node_modules/unzip-stream/lib/unzip-stream.js
var require_unzip_stream = __commonJS({ "node_modules/unzip-stream/lib/unzip-stream.js"(exports, module) {
	var binary = require_binary();
	var stream = __require("stream");
	var util$2 = __require("util");
	var zlib = __require("zlib");
	var MatcherStream = require_matcher_stream();
	var Entry = require_entry();
	const states = {
		STREAM_START: 0,
		START: 1,
		LOCAL_FILE_HEADER: 2,
		LOCAL_FILE_HEADER_SUFFIX: 3,
		FILE_DATA: 4,
		FILE_DATA_END: 5,
		DATA_DESCRIPTOR: 6,
		CENTRAL_DIRECTORY_FILE_HEADER: 7,
		CENTRAL_DIRECTORY_FILE_HEADER_SUFFIX: 8,
		CDIR64_END: 9,
		CDIR64_END_DATA_SECTOR: 10,
		CDIR64_LOCATOR: 11,
		CENTRAL_DIRECTORY_END: 12,
		CENTRAL_DIRECTORY_END_COMMENT: 13,
		TRAILING_JUNK: 14,
		ERROR: 99
	};
	const FOUR_GIGS = 4294967296;
	const SIG_LOCAL_FILE_HEADER = 67324752;
	const SIG_DATA_DESCRIPTOR = 134695760;
	const SIG_CDIR_RECORD = 33639248;
	const SIG_CDIR64_RECORD_END = 101075792;
	const SIG_CDIR64_LOCATOR_END = 117853008;
	const SIG_CDIR_RECORD_END = 101010256;
	function UnzipStream$2(options) {
		if (!(this instanceof UnzipStream$2)) return new UnzipStream$2(options);
		stream.Transform.call(this);
		this.options = options || {};
		this.data = new Buffer("");
		this.state = states.STREAM_START;
		this.skippedBytes = 0;
		this.parsedEntity = null;
		this.outStreamInfo = {};
	}
	util$2.inherits(UnzipStream$2, stream.Transform);
	UnzipStream$2.prototype.processDataChunk = function(chunk) {
		var requiredLength;
		switch (this.state) {
			case states.STREAM_START:
			case states.START:
				requiredLength = 4;
				break;
			case states.LOCAL_FILE_HEADER:
				requiredLength = 26;
				break;
			case states.LOCAL_FILE_HEADER_SUFFIX:
				requiredLength = this.parsedEntity.fileNameLength + this.parsedEntity.extraFieldLength;
				break;
			case states.DATA_DESCRIPTOR:
				requiredLength = 12;
				break;
			case states.CENTRAL_DIRECTORY_FILE_HEADER:
				requiredLength = 42;
				break;
			case states.CENTRAL_DIRECTORY_FILE_HEADER_SUFFIX:
				requiredLength = this.parsedEntity.fileNameLength + this.parsedEntity.extraFieldLength + this.parsedEntity.fileCommentLength;
				break;
			case states.CDIR64_END:
				requiredLength = 52;
				break;
			case states.CDIR64_END_DATA_SECTOR:
				requiredLength = this.parsedEntity.centralDirectoryRecordSize - 44;
				break;
			case states.CDIR64_LOCATOR:
				requiredLength = 16;
				break;
			case states.CENTRAL_DIRECTORY_END:
				requiredLength = 18;
				break;
			case states.CENTRAL_DIRECTORY_END_COMMENT:
				requiredLength = this.parsedEntity.commentLength;
				break;
			case states.FILE_DATA: return 0;
			case states.FILE_DATA_END: return 0;
			case states.TRAILING_JUNK:
				if (this.options.debug) console.log("found", chunk.length, "bytes of TRAILING_JUNK");
				return chunk.length;
			default: return chunk.length;
		}
		var chunkLength = chunk.length;
		if (chunkLength < requiredLength) return 0;
		switch (this.state) {
			case states.STREAM_START:
			case states.START:
				var signature = chunk.readUInt32LE(0);
				switch (signature) {
					case SIG_LOCAL_FILE_HEADER:
						this.state = states.LOCAL_FILE_HEADER;
						break;
					case SIG_CDIR_RECORD:
						this.state = states.CENTRAL_DIRECTORY_FILE_HEADER;
						break;
					case SIG_CDIR64_RECORD_END:
						this.state = states.CDIR64_END;
						break;
					case SIG_CDIR64_LOCATOR_END:
						this.state = states.CDIR64_LOCATOR;
						break;
					case SIG_CDIR_RECORD_END:
						this.state = states.CENTRAL_DIRECTORY_END;
						break;
					default:
						var isStreamStart = this.state === states.STREAM_START;
						if (!isStreamStart && (signature & 65535) !== 19280 && this.skippedBytes < 26) {
							var remaining = signature;
							var toSkip = 4;
							for (var i = 1; i < 4 && remaining !== 0; i++) {
								remaining = remaining >>> 8;
								if ((remaining & 255) === 80) {
									toSkip = i;
									break;
								}
							}
							this.skippedBytes += toSkip;
							if (this.options.debug) console.log("Skipped", this.skippedBytes, "bytes");
							return toSkip;
						}
						this.state = states.ERROR;
						var errMsg = isStreamStart ? "Not a valid zip file" : "Invalid signature in zip file";
						if (this.options.debug) {
							var sig = chunk.readUInt32LE(0);
							var asString;
							try {
								asString = chunk.slice(0, 4).toString();
							} catch (e) {}
							console.log("Unexpected signature in zip file: 0x" + sig.toString(16), "\"" + asString + "\", skipped", this.skippedBytes, "bytes");
						}
						this.emit("error", new Error(errMsg));
						return chunk.length;
				}
				this.skippedBytes = 0;
				return requiredLength;
			case states.LOCAL_FILE_HEADER:
				this.parsedEntity = this._readFile(chunk);
				this.state = states.LOCAL_FILE_HEADER_SUFFIX;
				return requiredLength;
			case states.LOCAL_FILE_HEADER_SUFFIX:
				var entry = new Entry();
				var isUtf8 = (this.parsedEntity.flags & 2048) !== 0;
				entry.path = this._decodeString(chunk.slice(0, this.parsedEntity.fileNameLength), isUtf8);
				var extraDataBuffer = chunk.slice(this.parsedEntity.fileNameLength, this.parsedEntity.fileNameLength + this.parsedEntity.extraFieldLength);
				var extra = this._readExtraFields(extraDataBuffer);
				if (extra && extra.parsed) {
					if (extra.parsed.path && !isUtf8) entry.path = extra.parsed.path;
					if (Number.isFinite(extra.parsed.uncompressedSize) && this.parsedEntity.uncompressedSize === FOUR_GIGS - 1) this.parsedEntity.uncompressedSize = extra.parsed.uncompressedSize;
					if (Number.isFinite(extra.parsed.compressedSize) && this.parsedEntity.compressedSize === FOUR_GIGS - 1) this.parsedEntity.compressedSize = extra.parsed.compressedSize;
				}
				this.parsedEntity.extra = extra.parsed || {};
				if (this.options.debug) {
					const debugObj = Object.assign({}, this.parsedEntity, {
						path: entry.path,
						flags: "0x" + this.parsedEntity.flags.toString(16),
						extraFields: extra && extra.debug
					});
					console.log("decoded LOCAL_FILE_HEADER:", JSON.stringify(debugObj, null, 2));
				}
				this._prepareOutStream(this.parsedEntity, entry);
				this.emit("entry", entry);
				this.state = states.FILE_DATA;
				return requiredLength;
			case states.CENTRAL_DIRECTORY_FILE_HEADER:
				this.parsedEntity = this._readCentralDirectoryEntry(chunk);
				this.state = states.CENTRAL_DIRECTORY_FILE_HEADER_SUFFIX;
				return requiredLength;
			case states.CENTRAL_DIRECTORY_FILE_HEADER_SUFFIX:
				var isUtf8 = (this.parsedEntity.flags & 2048) !== 0;
				var path$2 = this._decodeString(chunk.slice(0, this.parsedEntity.fileNameLength), isUtf8);
				var extraDataBuffer = chunk.slice(this.parsedEntity.fileNameLength, this.parsedEntity.fileNameLength + this.parsedEntity.extraFieldLength);
				var extra = this._readExtraFields(extraDataBuffer);
				if (extra && extra.parsed && extra.parsed.path && !isUtf8) path$2 = extra.parsed.path;
				this.parsedEntity.extra = extra.parsed;
				var isUnix = (this.parsedEntity.versionMadeBy & 65280) >> 8 === 3;
				var unixAttrs, isSymlink;
				if (isUnix) {
					unixAttrs = this.parsedEntity.externalFileAttributes >>> 16;
					var fileType = unixAttrs >>> 12;
					isSymlink = (fileType & 10) === 10;
				}
				if (this.options.debug) {
					const debugObj = Object.assign({}, this.parsedEntity, {
						path: path$2,
						flags: "0x" + this.parsedEntity.flags.toString(16),
						unixAttrs: unixAttrs && "0" + unixAttrs.toString(8),
						isSymlink,
						extraFields: extra.debug
					});
					console.log("decoded CENTRAL_DIRECTORY_FILE_HEADER:", JSON.stringify(debugObj, null, 2));
				}
				this.state = states.START;
				return requiredLength;
			case states.CDIR64_END:
				this.parsedEntity = this._readEndOfCentralDirectory64(chunk);
				if (this.options.debug) console.log("decoded CDIR64_END_RECORD:", this.parsedEntity);
				this.state = states.CDIR64_END_DATA_SECTOR;
				return requiredLength;
			case states.CDIR64_END_DATA_SECTOR:
				this.state = states.START;
				return requiredLength;
			case states.CDIR64_LOCATOR:
				this.state = states.START;
				return requiredLength;
			case states.CENTRAL_DIRECTORY_END:
				this.parsedEntity = this._readEndOfCentralDirectory(chunk);
				if (this.options.debug) console.log("decoded CENTRAL_DIRECTORY_END:", this.parsedEntity);
				this.state = states.CENTRAL_DIRECTORY_END_COMMENT;
				return requiredLength;
			case states.CENTRAL_DIRECTORY_END_COMMENT:
				if (this.options.debug) console.log("decoded CENTRAL_DIRECTORY_END_COMMENT:", chunk.slice(0, requiredLength).toString());
				this.state = states.TRAILING_JUNK;
				return requiredLength;
			case states.ERROR: return chunk.length;
			default:
				console.log("didn't handle state #", this.state, "discarding");
				return chunk.length;
		}
	};
	UnzipStream$2.prototype._prepareOutStream = function(vars, entry) {
		var self = this;
		var isDirectory = vars.uncompressedSize === 0 && /[\/\\]$/.test(entry.path);
		entry.path = entry.path.replace(/(?<=^|[/\\]+)[.][.]+(?=[/\\]+|$)/g, ".");
		entry.type = isDirectory ? "Directory" : "File";
		entry.isDirectory = isDirectory;
		var fileSizeKnown = !(vars.flags & 8);
		if (fileSizeKnown) entry.size = vars.uncompressedSize;
		var isVersionSupported = vars.versionsNeededToExtract <= 45;
		this.outStreamInfo = {
			stream: null,
			limit: fileSizeKnown ? vars.compressedSize : -1,
			written: 0
		};
		if (!fileSizeKnown) {
			var pattern = new Buffer(4);
			pattern.writeUInt32LE(SIG_DATA_DESCRIPTOR, 0);
			var zip64Mode = vars.extra.zip64Mode;
			var extraSize = zip64Mode ? 20 : 12;
			var searchPattern = {
				pattern,
				requiredExtraSize: extraSize
			};
			var matcherStream = new MatcherStream(searchPattern, function(matchedChunk, sizeSoFar) {
				var vars$1 = self._readDataDescriptor(matchedChunk, zip64Mode);
				var compressedSizeMatches = vars$1.compressedSize === sizeSoFar;
				if (!zip64Mode && !compressedSizeMatches && sizeSoFar >= FOUR_GIGS) {
					var overflown = sizeSoFar - FOUR_GIGS;
					while (overflown >= 0) {
						compressedSizeMatches = vars$1.compressedSize === overflown;
						if (compressedSizeMatches) break;
						overflown -= FOUR_GIGS;
					}
				}
				if (!compressedSizeMatches) return;
				self.state = states.FILE_DATA_END;
				var sliceOffset = zip64Mode ? 24 : 16;
				if (self.data.length > 0) self.data = Buffer.concat([matchedChunk.slice(sliceOffset), self.data]);
else self.data = matchedChunk.slice(sliceOffset);
				return true;
			});
			this.outStreamInfo.stream = matcherStream;
		} else this.outStreamInfo.stream = new stream.PassThrough();
		var isEncrypted = vars.flags & 1 || vars.flags & 64;
		if (isEncrypted || !isVersionSupported) {
			var message = isEncrypted ? "Encrypted files are not supported!" : "Zip version " + Math.floor(vars.versionsNeededToExtract / 10) + "." + vars.versionsNeededToExtract % 10 + " is not supported";
			entry.skip = true;
			setImmediate(() => {
				self.emit("error", new Error(message));
			});
			this.outStreamInfo.stream.pipe(new Entry().autodrain());
			return;
		}
		var isCompressed = vars.compressionMethod > 0;
		if (isCompressed) {
			var inflater = zlib.createInflateRaw();
			inflater.on("error", function(err) {
				self.state = states.ERROR;
				self.emit("error", err);
			});
			this.outStreamInfo.stream.pipe(inflater).pipe(entry);
		} else this.outStreamInfo.stream.pipe(entry);
		if (this._drainAllEntries) entry.autodrain();
	};
	UnzipStream$2.prototype._readFile = function(data) {
		var vars = binary.parse(data).word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").vars;
		return vars;
	};
	UnzipStream$2.prototype._readExtraFields = function(data) {
		var extra = {};
		var result = { parsed: extra };
		if (this.options.debug) result.debug = [];
		var index = 0;
		while (index < data.length) {
			var vars = binary.parse(data).skip(index).word16lu("extraId").word16lu("extraSize").vars;
			index += 4;
			var fieldType = undefined;
			switch (vars.extraId) {
				case 1:
					fieldType = "Zip64 extended information extra field";
					var z64vars = binary.parse(data.slice(index, index + vars.extraSize)).word64lu("uncompressedSize").word64lu("compressedSize").word64lu("offsetToLocalHeader").word32lu("diskStartNumber").vars;
					if (z64vars.uncompressedSize !== null) extra.uncompressedSize = z64vars.uncompressedSize;
					if (z64vars.compressedSize !== null) extra.compressedSize = z64vars.compressedSize;
					extra.zip64Mode = true;
					break;
				case 10:
					fieldType = "NTFS extra field";
					break;
				case 21589:
					fieldType = "extended timestamp";
					var timestampFields = data.readUInt8(index);
					var offset = 1;
					if (vars.extraSize >= offset + 4 && timestampFields & 1) {
						extra.mtime = new Date(data.readUInt32LE(index + offset) * 1e3);
						offset += 4;
					}
					if (vars.extraSize >= offset + 4 && timestampFields & 2) {
						extra.atime = new Date(data.readUInt32LE(index + offset) * 1e3);
						offset += 4;
					}
					if (vars.extraSize >= offset + 4 && timestampFields & 4) extra.ctime = new Date(data.readUInt32LE(index + offset) * 1e3);
					break;
				case 28789:
					fieldType = "Info-ZIP Unicode Path Extra Field";
					var fieldVer = data.readUInt8(index);
					if (fieldVer === 1) {
						var offset = 1;
						var nameCrc32 = data.readUInt32LE(index + offset);
						offset += 4;
						var pathBuffer = data.slice(index + offset);
						extra.path = pathBuffer.toString();
					}
					break;
				case 13:
				case 22613:
					fieldType = vars.extraId === 13 ? "PKWARE Unix" : "Info-ZIP UNIX (type 1)";
					var offset = 0;
					if (vars.extraSize >= 8) {
						var atime = new Date(data.readUInt32LE(index + offset) * 1e3);
						offset += 4;
						var mtime = new Date(data.readUInt32LE(index + offset) * 1e3);
						offset += 4;
						extra.atime = atime;
						extra.mtime = mtime;
						if (vars.extraSize >= 12) {
							var uid = data.readUInt16LE(index + offset);
							offset += 2;
							var gid = data.readUInt16LE(index + offset);
							offset += 2;
							extra.uid = uid;
							extra.gid = gid;
						}
					}
					break;
				case 30805:
					fieldType = "Info-ZIP UNIX (type 2)";
					var offset = 0;
					if (vars.extraSize >= 4) {
						var uid = data.readUInt16LE(index + offset);
						offset += 2;
						var gid = data.readUInt16LE(index + offset);
						offset += 2;
						extra.uid = uid;
						extra.gid = gid;
					}
					break;
				case 30837:
					fieldType = "Info-ZIP New Unix";
					var offset = 0;
					var extraVer = data.readUInt8(index);
					offset += 1;
					if (extraVer === 1) {
						var uidSize = data.readUInt8(index + offset);
						offset += 1;
						if (uidSize <= 6) extra.uid = data.readUIntLE(index + offset, uidSize);
						offset += uidSize;
						var gidSize = data.readUInt8(index + offset);
						offset += 1;
						if (gidSize <= 6) extra.gid = data.readUIntLE(index + offset, gidSize);
					}
					break;
				case 30062:
					fieldType = "ASi Unix";
					var offset = 0;
					if (vars.extraSize >= 14) {
						var crc = data.readUInt32LE(index + offset);
						offset += 4;
						var mode = data.readUInt16LE(index + offset);
						offset += 2;
						var sizdev = data.readUInt32LE(index + offset);
						offset += 4;
						var uid = data.readUInt16LE(index + offset);
						offset += 2;
						var gid = data.readUInt16LE(index + offset);
						offset += 2;
						extra.mode = mode;
						extra.uid = uid;
						extra.gid = gid;
						if (vars.extraSize > 14) {
							var start = index + offset;
							var end = index + vars.extraSize - 14;
							var symlinkName = this._decodeString(data.slice(start, end));
							extra.symlink = symlinkName;
						}
					}
					break;
			}
			if (this.options.debug) result.debug.push({
				extraId: "0x" + vars.extraId.toString(16),
				description: fieldType,
				data: data.slice(index, index + vars.extraSize).inspect()
			});
			index += vars.extraSize;
		}
		return result;
	};
	UnzipStream$2.prototype._readDataDescriptor = function(data, zip64Mode) {
		if (zip64Mode) {
			var vars = binary.parse(data).word32lu("dataDescriptorSignature").word32lu("crc32").word64lu("compressedSize").word64lu("uncompressedSize").vars;
			return vars;
		}
		var vars = binary.parse(data).word32lu("dataDescriptorSignature").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").vars;
		return vars;
	};
	UnzipStream$2.prototype._readCentralDirectoryEntry = function(data) {
		var vars = binary.parse(data).word16lu("versionMadeBy").word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").word16lu("fileCommentLength").word16lu("diskNumber").word16lu("internalFileAttributes").word32lu("externalFileAttributes").word32lu("offsetToLocalFileHeader").vars;
		return vars;
	};
	UnzipStream$2.prototype._readEndOfCentralDirectory64 = function(data) {
		var vars = binary.parse(data).word64lu("centralDirectoryRecordSize").word16lu("versionMadeBy").word16lu("versionsNeededToExtract").word32lu("diskNumber").word32lu("diskNumberWithCentralDirectoryStart").word64lu("centralDirectoryEntries").word64lu("totalCentralDirectoryEntries").word64lu("sizeOfCentralDirectory").word64lu("offsetToStartOfCentralDirectory").vars;
		return vars;
	};
	UnzipStream$2.prototype._readEndOfCentralDirectory = function(data) {
		var vars = binary.parse(data).word16lu("diskNumber").word16lu("diskStart").word16lu("centralDirectoryEntries").word16lu("totalCentralDirectoryEntries").word32lu("sizeOfCentralDirectory").word32lu("offsetToStartOfCentralDirectory").word16lu("commentLength").vars;
		return vars;
	};
	const cp437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";
	UnzipStream$2.prototype._decodeString = function(buffer, isUtf8) {
		if (isUtf8) return buffer.toString("utf8");
		if (this.options.decodeString) return this.options.decodeString(buffer);
		let result = "";
		for (var i = 0; i < buffer.length; i++) result += cp437[buffer[i]];
		return result;
	};
	UnzipStream$2.prototype._parseOrOutput = function(encoding, cb) {
		var consume;
		while ((consume = this.processDataChunk(this.data)) > 0) {
			this.data = this.data.slice(consume);
			if (this.data.length === 0) break;
		}
		if (this.state === states.FILE_DATA) {
			if (this.outStreamInfo.limit >= 0) {
				var remaining = this.outStreamInfo.limit - this.outStreamInfo.written;
				var packet;
				if (remaining < this.data.length) {
					packet = this.data.slice(0, remaining);
					this.data = this.data.slice(remaining);
				} else {
					packet = this.data;
					this.data = new Buffer("");
				}
				this.outStreamInfo.written += packet.length;
				if (this.outStreamInfo.limit === this.outStreamInfo.written) {
					this.state = states.START;
					this.outStreamInfo.stream.end(packet, encoding, cb);
				} else this.outStreamInfo.stream.write(packet, encoding, cb);
			} else {
				var packet = this.data;
				this.data = new Buffer("");
				this.outStreamInfo.written += packet.length;
				var outputStream = this.outStreamInfo.stream;
				outputStream.write(packet, encoding, () => {
					if (this.state === states.FILE_DATA_END) {
						this.state = states.START;
						return outputStream.end(cb);
					}
					cb();
				});
			}
			return;
		}
		cb();
	};
	UnzipStream$2.prototype.drainAll = function() {
		this._drainAllEntries = true;
	};
	UnzipStream$2.prototype._transform = function(chunk, encoding, cb) {
		var self = this;
		if (self.data.length > 0) self.data = Buffer.concat([self.data, chunk]);
else self.data = chunk;
		var startDataLength = self.data.length;
		var done = function() {
			if (self.data.length > 0 && self.data.length < startDataLength) {
				startDataLength = self.data.length;
				self._parseOrOutput(encoding, done);
				return;
			}
			cb();
		};
		self._parseOrOutput(encoding, done);
	};
	UnzipStream$2.prototype._flush = function(cb) {
		var self = this;
		if (self.data.length > 0) {
			self._parseOrOutput("buffer", function() {
				if (self.data.length > 0) return setImmediate(function() {
					self._flush(cb);
				});
				cb();
			});
			return;
		}
		if (self.state === states.FILE_DATA) return cb(new Error("Stream finished in an invalid state, uncompression failed"));
		setImmediate(cb);
	};
	module.exports = UnzipStream$2;
} });

//#endregion
//#region node_modules/unzip-stream/lib/parser-stream.js
var require_parser_stream = __commonJS({ "node_modules/unzip-stream/lib/parser-stream.js"(exports, module) {
	var Transform$1 = __require("stream").Transform;
	var util$1 = __require("util");
	var UnzipStream$1 = require_unzip_stream();
	function ParserStream(opts) {
		if (!(this instanceof ParserStream)) return new ParserStream(opts);
		var transformOpts = opts || {};
		Transform$1.call(this, { readableObjectMode: true });
		this.opts = opts || {};
		this.unzipStream = new UnzipStream$1(this.opts);
		var self = this;
		this.unzipStream.on("entry", function(entry) {
			self.push(entry);
		});
		this.unzipStream.on("error", function(error) {
			self.emit("error", error);
		});
	}
	util$1.inherits(ParserStream, Transform$1);
	ParserStream.prototype._transform = function(chunk, encoding, cb) {
		this.unzipStream.write(chunk, encoding, cb);
	};
	ParserStream.prototype._flush = function(cb) {
		var self = this;
		this.unzipStream.end(function() {
			process.nextTick(function() {
				self.emit("close");
			});
			cb();
		});
	};
	ParserStream.prototype.on = function(eventName, fn) {
		if (eventName === "entry") return Transform$1.prototype.on.call(this, "data", fn);
		return Transform$1.prototype.on.call(this, eventName, fn);
	};
	ParserStream.prototype.drainAll = function() {
		this.unzipStream.drainAll();
		return this.pipe(new Transform$1({
			objectMode: true,
			transform: function(d, e, cb) {
				cb();
			}
		}));
	};
	module.exports = ParserStream;
} });

//#endregion
//#region node_modules/mkdirp/index.js
var require_mkdirp = __commonJS({ "node_modules/mkdirp/index.js"(exports, module) {
	var path$1 = __require("path");
	var fs$1 = __require("fs");
	var _0777 = parseInt("0777", 8);
	module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
	function mkdirP(p, opts, f, made) {
		if (typeof opts === "function") {
			f = opts;
			opts = {};
		} else if (!opts || typeof opts !== "object") opts = { mode: opts };
		var mode = opts.mode;
		var xfs = opts.fs || fs$1;
		if (mode === undefined) mode = _0777;
		if (!made) made = null;
		var cb = f || function() {};
		p = path$1.resolve(p);
		xfs.mkdir(p, mode, function(er) {
			if (!er) {
				made = made || p;
				return cb(null, made);
			}
			switch (er.code) {
				case "ENOENT":
					if (path$1.dirname(p) === p) return cb(er);
					mkdirP(path$1.dirname(p), opts, function(er$1, made$1) {
						if (er$1) cb(er$1, made$1);
else mkdirP(p, opts, cb, made$1);
					});
					break;
				default:
					xfs.stat(p, function(er2, stat) {
						if (er2 || !stat.isDirectory()) cb(er, made);
else cb(null, made);
					});
					break;
			}
		});
	}
	mkdirP.sync = function sync(p, opts, made) {
		if (!opts || typeof opts !== "object") opts = { mode: opts };
		var mode = opts.mode;
		var xfs = opts.fs || fs$1;
		if (mode === undefined) mode = _0777;
		if (!made) made = null;
		p = path$1.resolve(p);
		try {
			xfs.mkdirSync(p, mode);
			made = made || p;
		} catch (err0) {
			switch (err0.code) {
				case "ENOENT":
					made = sync(path$1.dirname(p), opts, made);
					sync(p, opts, made);
					break;
				default:
					var stat;
					try {
						stat = xfs.statSync(p);
					} catch (err1) {
						throw err0;
					}
					if (!stat.isDirectory()) throw err0;
					break;
			}
		}
		return made;
	};
} });

//#endregion
//#region node_modules/unzip-stream/lib/extract.js
var require_extract = __commonJS({ "node_modules/unzip-stream/lib/extract.js"(exports, module) {
	var fs = __require("fs");
	var path = __require("path");
	var util = __require("util");
	var mkdirp = require_mkdirp();
	var Transform = __require("stream").Transform;
	var UnzipStream = require_unzip_stream();
	function Extract$1(opts) {
		if (!(this instanceof Extract$1)) return new Extract$1(opts);
		Transform.call(this);
		this.opts = opts || {};
		this.unzipStream = new UnzipStream(this.opts);
		this.unfinishedEntries = 0;
		this.afterFlushWait = false;
		this.createdDirectories = {};
		var self = this;
		this.unzipStream.on("entry", this._processEntry.bind(this));
		this.unzipStream.on("error", function(error) {
			self.emit("error", error);
		});
	}
	util.inherits(Extract$1, Transform);
	Extract$1.prototype._transform = function(chunk, encoding, cb) {
		this.unzipStream.write(chunk, encoding, cb);
	};
	Extract$1.prototype._flush = function(cb) {
		var self = this;
		var allDone = function() {
			process.nextTick(function() {
				self.emit("close");
			});
			cb();
		};
		this.unzipStream.end(function() {
			if (self.unfinishedEntries > 0) {
				self.afterFlushWait = true;
				return self.on("await-finished", allDone);
			}
			allDone();
		});
	};
	Extract$1.prototype._processEntry = function(entry) {
		var self = this;
		var destPath = path.join(this.opts.path, entry.path);
		var directory = entry.isDirectory ? destPath : path.dirname(destPath);
		this.unfinishedEntries++;
		var writeFileFn = function() {
			var pipedStream = fs.createWriteStream(destPath);
			pipedStream.on("close", function() {
				self.unfinishedEntries--;
				self._notifyAwaiter();
			});
			pipedStream.on("error", function(error) {
				self.emit("error", error);
			});
			entry.pipe(pipedStream);
		};
		if (this.createdDirectories[directory] || directory === ".") return writeFileFn();
		mkdirp(directory, function(err) {
			if (err) return self.emit("error", err);
			self.createdDirectories[directory] = true;
			if (entry.isDirectory) {
				self.unfinishedEntries--;
				self._notifyAwaiter();
				return;
			}
			writeFileFn();
		});
	};
	Extract$1.prototype._notifyAwaiter = function() {
		if (this.afterFlushWait && this.unfinishedEntries === 0) {
			this.emit("await-finished");
			this.afterFlushWait = false;
		}
	};
	module.exports = Extract$1;
} });

//#endregion
//#region node_modules/unzip-stream/unzip.js
var require_unzip = __commonJS({ "node_modules/unzip-stream/unzip.js"(exports) {
	exports.Parse = require_parser_stream();
	exports.Extract = require_extract();
} });

//#endregion
//#region src/main.ts
var import_unzip = __toESM(require_unzip(), 1);
async function main() {
	const response = await fetch(LINK_BDS_VERSIONS);
	if (OS !== "win32" && OS !== "linux") {
		console.error("Unsupported operating system: " + OS);
		return -1;
	}
	if (!response.ok) {
		console.error("Failed to fetch bds versions!");
		return -1;
	}
	const SYSTEM = OS === "win32" ? "windows" : OS;
	const { [SYSTEM]: { [USE_PREVIEW ? "preview" : "stable"]: LATEST, [USE_PREVIEW ? "preview_versions" : "versions"]: VERSIONS } } = await response.json();
	let version = REQUESTED_VERSION ?? "latest";
	if (version === "latest") version = LATEST;
	if (!isValidVersion(version)) {
		console.error("Unknown version format: " + version);
		return -1;
	}
	const LINK = `${LINK_BDS_CDN}/bin-${OS === "win32" ? "win" : OS}${USE_PREVIEW ? "-preview" : ""}bedrock-server-${version}.zip`;
	const BDS_STREAM = await fetch(LINK);
	if (!BDS_STREAM.ok) {
		console.error("CDN file not found: " + LINK);
		return -1;
	}
	await pipeline(BDS_STREAM.body, (0, import_unzip.Extract)({ path: OUT_DIR ?? "bds_bin" }));
	return 0;
}
main().then(exit, (e) => {
	console.error(e, e.stack);
	exit(-1);
});
function isValidVersion(version) {
	const segments = version.split(".");
	if (segments.length !== 4) return false;
	for (const segment of segments) {
		const num = parseInt(segment, 10);
		if (!isFinite(num) || num < 0) return false;
	}
	return true;
}

//#endregion