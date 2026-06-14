import { Fragment as e, Transition as t, computed as n, createBlock as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createSlots as s, createTextVNode as c, createVNode as l, defineComponent as u, guardReactiveProps as d, inject as f, mergeProps as p, normalizeClass as m, normalizeProps as h, normalizeStyle as g, onBeforeUnmount as _, onMounted as v, onUnmounted as y, openBlock as b, provide as x, ref as S, renderList as C, renderSlot as w, toDisplayString as T, toRef as E, toRefs as ee, unref as D, useSlots as O, vShow as te, watch as k, withCtx as A, withDirectives as ne, withModifiers as re } from "vue";
//#region \0plugin-vue:export-helper
var j = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ie = {}, ae = { class: "inline-flex relative w-[60px] h-[60px]" };
function M(t, n) {
	return b(), a("div", ae, [(b(), a(e, null, C(4, (e) => o("div", {
		key: e,
		class: m(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring border-t-vdt-primary-500", [`animate-delay-${(e - 1) * 150}`]])
	}, null, 2)), 64))]);
}
var oe = /*#__PURE__*/ j(ie, [["render", M], ["__scopeId", "data-v-c23c712b"]]), se = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, ce = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, N = { class: "w-64" }, le = { class: "h-2 bg-gray-200 rounded-sm" }, ue = { class: "text-center text-sm text-gray-600" }, de = /* @__PURE__ */ u({
	__name: "SelectionLoadingOverlay",
	props: { progress: {} },
	setup(e) {
		return (e, t) => (b(), a("div", se, [o("div", ce, [
			t[0] ||= o("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1),
			o("div", N, [o("div", le, [o("div", {
				class: "h-2 rounded-sm transition-all duration-300 ease-out bg-vdt-primary-500",
				style: g({ width: `${e.progress}%` })
			}, null, 4)])]),
			o("div", ue, T(Math.round(e.progress)) + "% ", 1)
		])]));
	}
});
//#endregion
//#region src/composables/useClickRow.ts
function fe(e, t, n, r, i, a, o, s, c) {
	let l = (e, r) => {
		let i = { ...e };
		return t.value && (delete i.checkbox, i.isSelected = e.checkbox), n.value && (delete i.index, i.indexInCurrentPage = r + 1), i;
	};
	return {
		handleRowClick: (t, n, u) => {
			t.target.closest(".checkbox, .expand-button") || (i.value && o(u, n, t), a.value && !r(n) && s(n), e.value === "single" && c("clickRow", l(n, u), t));
		},
		handleRowDoubleClick: (t, n, r) => {
			e.value === "double" && c("clickRow", l(n, r), t);
		},
		handleRowContextMenu: (e, t) => {
			c("contextmenuRow", l(t, -1), e);
		}
	};
}
//#endregion
//#region src/composables/useExpandableRow.ts
function pe(e, t, n) {
	let r = S([]);
	return {
		expandingItemIndexList: r,
		updateExpandingItemIndexList: (i, a, o) => {
			o.stopPropagation();
			let s = r.value.indexOf(i);
			if (s !== -1) r.value.splice(s, 1);
			else {
				let i = e.value.findIndex((e) => JSON.stringify(e) === JSON.stringify(a));
				n("expandRow", t.value + i, a), r.value.push(t.value + i);
			}
		},
		clearExpandingItemIndexList: () => {
			r.value = [];
		}
	};
}
//#endregion
//#region src/composables/useFixedColumn.ts
function me(e, t) {
	let r = n(() => e.value.filter((e) => e.fixed)), i = n(() => r.value.filter((e) => !e.fixedPosition || e.fixedPosition === "left")), a = n(() => r.value.filter((e) => e.fixedPosition === "right")), o = n(() => i.value.length ? i.value[i.value.length - 1].value : ""), s = n(() => a.value.length ? a.value[0].value : ""), c = n(() => {
		if (!r.value.length) return [];
		let e = [];
		if (i.value.length) {
			let t = i.value.map((e) => e.width ?? 100);
			i.value.forEach((n, r) => {
				e.push({
					value: n.value,
					fixed: !0,
					position: "left",
					width: n.width ?? 100,
					distance: r === 0 ? 0 : t.reduce((e, t, n) => n < r ? e + t : e, 0)
				});
			});
		}
		if (a.value.length) {
			let t = a.value.map((e) => e.width ?? 100);
			a.value.forEach((n, r) => {
				e.push({
					value: n.value,
					fixed: !0,
					position: "right",
					width: n.width ?? 100,
					distance: r === a.value.length - 1 ? 0 : t.reduce((e, t, n) => n > r ? e + t : e, 0)
				});
			});
		}
		return e;
	}), l = S(!1), u = null;
	return v(() => {
		let e = t.value;
		if (e) {
			let t = () => {
				l.value = e.scrollLeft > 0;
			};
			t(), e.addEventListener("scroll", t), u = () => {
				e.removeEventListener("scroll", t);
			};
		}
	}), y(() => {
		u &&= (u(), null);
	}), {
		fixedHeaders: r,
		leftFixedHeaders: i,
		rightFixedHeaders: a,
		lastLeftFixedColumn: o,
		firstRightFixedColumn: s,
		fixedColumnsInfos: c,
		showShadow: l
	};
}
//#endregion
//#region src/composables/useHeaders.ts
function he(e, t, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b) {
	let x = n(() => s.value.length ? {
		hasFixedColumns: s.value.some((e) => e.fixed),
		fixedHeaders: s.value.filter((e) => e.fixed),
		unFixedHeaders: s.value.filter((e) => !e.fixed)
	} : {
		hasFixedColumns: !1,
		fixedHeaders: [],
		unFixedHeaders: []
	}), C = S(ge(h.value, g.value, _.value)), { determineHeaderSortState: w } = ye(d, p, _, C), T = n(() => {
		let e = s.value.map((e) => ({
			...e,
			sortType: e.sortable ? w(e.value) : void 0
		})), t = e.filter((e) => e.fixed && (!e.fixedPosition || e.fixedPosition === "left")), n = e.filter((e) => !e.fixed), r = e.filter((e) => e.fixed && e.fixedPosition === "right");
		return [
			...Object.values(E.value).filter(Boolean),
			...t,
			...n,
			...r
		];
	}), E = n(() => ({
		checkbox: u.value && {
			text: "checkbox",
			value: "checkbox",
			fixed: i.value || x.value.hasFixedColumns,
			fixedPosition: "left",
			width: t.value ?? 36
		},
		index: m.value && {
			text: e.value,
			value: "index",
			fixed: o.value || x.value.hasFixedColumns,
			fixedPosition: "left",
			width: l.value
		},
		expand: c.value && !v.value && {
			text: "",
			value: "expand",
			fixed: a.value || x.value.hasFixedColumns,
			fixedPosition: "left",
			width: r.value
		}
	}));
	return {
		clientSortOptions: C,
		headerColumns: n(() => T.value.map((e) => e.value)),
		headersForRender: T,
		updateSortField: (e, t) => {
			let n = t === "none" ? "asc" : t === "asc" ? "desc" : f.value ? "asc" : null;
			if (d.value) {
				y(e, n);
				return;
			}
			C.value = _.value ? _e(e, n, C.value) : ve(e, n), b("updateSort", {
				sortType: n,
				sortBy: e
			});
		},
		isMultiSorting: n(() => (e) => {
			let t = d.value ? p.value?.sortBy : C.value?.sortBy;
			return Array.isArray(t) && t.includes(e);
		}),
		getMultiSortNumber: n(() => (e) => {
			let t = d.value ? p.value?.sortBy : C.value?.sortBy;
			return Array.isArray(t) ? t.indexOf(e) + 1 : !1;
		})
	};
}
function ge(e, t, n) {
	return n && Array.isArray(e) && Array.isArray(t) ? {
		sortBy: e,
		sortDesc: t.map((e) => e === "desc")
	} : typeof e == "string" && e !== "" ? {
		sortBy: e,
		sortDesc: t === "desc"
	} : null;
}
var _e = (e, t, n) => {
	if (!n?.sortBy || !Array.isArray(n.sortBy) || !Array.isArray(n.sortDesc)) return t === null ? null : {
		sortBy: [e],
		sortDesc: [t === "desc"]
	};
	let r = n.sortBy.indexOf(e), i = [...n.sortBy], a = [...n.sortDesc];
	return r === -1 && t !== null ? (i.push(e), a.push(t === "desc")) : t === null ? (i.splice(r, 1), a.splice(r, 1)) : a[r] = t === "desc", {
		sortBy: i,
		sortDesc: a
	};
}, ve = (e, t) => t === null ? null : {
	sortBy: e,
	sortDesc: t === "desc"
};
function ye(e, t, n, r) {
	let i = (n) => !e.value || !t.value ? a(n) : o(n), a = (e) => {
		if (!r.value) return "none";
		let { sortBy: t, sortDesc: i } = r.value;
		if (n.value && Array.isArray(t) && Array.isArray(i)) {
			let n = t.indexOf(e);
			return n === -1 ? "none" : i[n] ? "desc" : "asc";
		}
		return e === t ? i ? "desc" : "asc" : "none";
	}, o = (e) => {
		let { sortBy: r, sortType: i } = t.value;
		if (n.value && Array.isArray(r) && Array.isArray(i)) {
			let t = r.indexOf(e);
			return t === -1 ? "none" : i[t];
		}
		return e === r && i ? i : "none";
	};
	return { determineHeaderSortState: i };
}
//#endregion
//#region src/composables/usePageItems.ts
var be = class {
	itemKeyCache = /* @__PURE__ */ new WeakMap();
	pageCache = /* @__PURE__ */ new Map();
	getItemKey(e) {
		let t = this.itemKeyCache.get(e);
		if (!t) {
			let { checkbox: n, index: r, ...i } = e;
			t = Object.entries(i).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => `${e}:${t}`).join("|"), this.itemKeyCache.set(e, t);
		}
		return t;
	}
	clearPageCache() {
		this.pageCache.clear();
	}
};
function xe(e, t, r, i, a, o, s, c, l, u) {
	let d = new be(), f = n(() => (e.value - 1) * a.value + 1), p = n(() => r.value ? Math.min(l.value, e.value * a.value) : Math.min(c.value.length, e.value * a.value)), m = n(() => r.value ? i.value : c.value.slice(f.value - 1, p.value)), h = n(() => s.value ? m.value.map((e, t) => ({
		index: f.value + t,
		...e
	})) : m.value), g = n(() => {
		if (o.value.length === 0) return "noneSelected";
		let e = u ? c.value.filter((e) => !u(e)) : c.value;
		return o.value.length === e.length && o.value.every((t) => e.some((e) => d.getItemKey(t) === d.getItemKey(e))) ? "allSelected" : "partSelected";
	});
	return {
		currentPageFirstIndex: f,
		currentPageLastIndex: p,
		multipleSelectStatus: g,
		pageItems: n(() => {
			if (!t.value) return h.value;
			switch (g.value) {
				case "allSelected": return h.value.map((e) => ({
					checkbox: !u || !u(e),
					...e
				}));
				case "noneSelected": return h.value.map((e) => ({
					checkbox: !1,
					...e
				}));
				default: return h.value.map((e) => ({
					checkbox: o.value.some((t) => d.getItemKey(e) === d.getItemKey(t)) && (!u || !u(e)),
					...e
				}));
			}
		})
	};
}
//#endregion
//#region src/composables/usePagination.ts
function Se(e, t, r, i, a, o, s) {
	let c = S(o.value ? o.value.page : e.value), l = n(() => Math.ceil(i.value / a.value)), u = n(() => l.value === 0 || c.value === l.value), d = n(() => c.value === 1);
	return {
		currentPaginationNumber: c,
		maxPaginationNumber: l,
		isLastPage: u,
		isFirstPage: d,
		nextPage: () => {
			i.value !== 0 && (u.value || r.value || (t.value ? s(c.value + 1) : c.value += 1));
		},
		prevPage: () => {
			i.value !== 0 && (d.value || r.value || (t.value ? s(c.value - 1) : --c.value));
		},
		updatePage: (e) => {
			r.value || (t.value ? s(e) : c.value = e);
		},
		updateCurrentPaginationNumber: (e) => {
			c.value = e;
		}
	};
}
//#endregion
//#region src/composables/useRows.ts
function Ce(e, t, r, i) {
	let a = n(() => !e.value && t.value.findIndex((e) => e === i.value) === -1 ? [i.value, ...t.value] : t.value), o = S(r.value?.rowsPerPage ?? i.value);
	return {
		rowsItemsComputed: a,
		rowsPerPageRef: o,
		updateRowsPerPage: (e) => {
			o.value = e;
		}
	};
}
//#endregion
//#region src/composables/useServerOptions.ts
function we(e, t, r) {
	let i = n({
		get: () => {
			if (e.value) {
				let { page: t, rowsPerPage: n, sortBy: r, sortType: i } = e.value;
				return {
					page: t,
					rowsPerPage: n,
					sortBy: r ?? null,
					sortType: i ?? null
				};
			}
			return null;
		},
		set: (e) => {
			r("update:serverOptions", e);
		}
	});
	return {
		serverOptionsComputed: i,
		updateServerOptionsPage: (e) => {
			i.value &&= {
				...i.value,
				page: e
			};
		},
		updateServerOptionsSort: (e, n) => {
			let r = i.value;
			if (r) if (t.value && Array.isArray(r.sortBy) && Array.isArray(r.sortType)) {
				let t = [...r.sortBy], a = [...r.sortType], o = t.findIndex((t) => t === e);
				o === -1 ? n !== null && (t.push(e), a.push(n)) : n === null ? (t.splice(o, 1), a.splice(o, 1)) : a[o] = n, i.value = {
					...r,
					sortBy: t,
					sortType: a
				};
			} else i.value = {
				...r,
				sortBy: n === null ? null : e,
				sortType: n
			};
		},
		updateServerOptionsRowsPerPage: (e) => {
			i.value &&= {
				...i.value,
				page: 1,
				rowsPerPage: e
			};
		}
	};
}
//#endregion
//#region src/utils/filter.ts
function Te(e) {
	return [
		">",
		">=",
		"<",
		"<=",
		"between"
	].includes(e.comparison);
}
function Ee(e) {
	return e.comparison === "in";
}
function P(e) {
	return typeof e.comparison == "function";
}
function F(e) {
	return typeof e == "number" && !isNaN(e);
}
var De = {
	number(e, t, n) {
		return {
			field: e,
			comparison: t,
			criteria: n
		};
	},
	string(e, t, n) {
		return {
			field: e,
			comparison: t,
			criteria: n
		};
	},
	array(e, t) {
		return {
			field: e,
			comparison: "in",
			criteria: t
		};
	},
	custom(e, t, n) {
		return {
			field: e,
			comparison: t,
			criteria: n
		};
	}
};
//#endregion
//#region src/utils/utils.ts
function I(e, t) {
	if (e.includes(".")) {
		let n = e.split("."), r = t;
		for (let e of n) if (r && typeof r == "object") r = r[e];
		else return "";
		return r ?? "";
	}
	return t[e] ?? "";
}
function Oe(e, t) {
	let n = I(e, t);
	return Array.isArray(n) ? n.join(",") : n;
}
//#endregion
//#region src/composables/useBatchSelection.ts
var ke = 1e3, Ae = /* @__PURE__ */ new WeakMap(), L = (e) => {
	let t = Ae.get(e);
	if (!t) {
		let { checkbox: n, index: r, ...i } = e;
		t = JSON.stringify(i), Ae.set(e, t);
	}
	return t;
};
function je(e, t, r, i) {
	let a = S({
		selectedItems: /* @__PURE__ */ new Set(),
		itemsMap: /* @__PURE__ */ new Map(),
		selectionInProgress: !1,
		processedCount: 0,
		totalCount: 0,
		visualProgress: 0
	});
	k(t, (e) => {
		if (e === null) {
			a.value.selectedItems.clear(), a.value.itemsMap.clear();
			return;
		}
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
		for (let r of e) {
			let e = L(r);
			t.add(e), n.set(e, r);
		}
		a.value.selectedItems = t, a.value.itemsMap = n;
	}, {
		immediate: !0,
		deep: !0
	});
	let o = async (e, t, n) => new Promise((r) => {
		requestAnimationFrame(() => {
			let i = new Set(a.value.selectedItems), o = new Map(a.value.itemsMap);
			for (let r = 0; r < e.length; r++) {
				let s = e[r], c = L(s);
				t ? (i.add(c), o.set(c, s)) : i.delete(c), a.value.processedCount = n + r + 1, a.value.visualProgress = a.value.processedCount / a.value.totalCount * 100;
			}
			a.value.selectedItems = i, a.value.itemsMap = o, r();
		});
	}), s = async (t) => {
		if (!a.value.selectionInProgress) try {
			if (a.value.selectionInProgress = !0, a.value.processedCount = 0, a.value.totalCount = e.value.length, a.value.visualProgress = 0, !t) {
				a.value.selectedItems.clear(), a.value.itemsMap.clear(), i("update:itemsSelected", []), a.value.visualProgress = 100;
				return;
			}
			let n = e.value;
			for (let e = 0; e < n.length; e += ke) await o(n.slice(e, Math.min(e + ke, n.length)).filter((e) => !r(e)), t, e), await new Promise((e) => setTimeout(e, 0));
			i("update:itemsSelected", l.value), t && i("selectAll");
		} finally {
			a.value.selectionInProgress = !1;
		}
	}, c = (e) => {
		let t = L(e), n = { ...e };
		delete n.checkbox, delete n.index;
		let r = new Set(a.value.selectedItems), o = new Map(a.value.itemsMap);
		r.has(t) ? (r.delete(t), i("deselectRow", n)) : (r.add(t), o.set(t, n), i("selectRow", n)), a.value.selectedItems = r, a.value.itemsMap = o, i("update:itemsSelected", Array.from(o.values()).filter((e) => r.has(L(e))));
	}, l = n(() => a.value.selectedItems.size === 0 ? [] : Array.from(a.value.itemsMap.entries()).filter(([e]) => a.value.selectedItems.has(e)).map(([, e]) => e)), u = n(() => a.value.visualProgress);
	return {
		selectedItems: l,
		toggleSelectAll: s,
		toggleSelectItem: c,
		isProcessing: n(() => a.value.selectionInProgress),
		selectionProgress: u
	};
}
//#endregion
//#region src/composables/useTotalItems.ts
function Me(e, t, r, i, a, o, s, c, l, u, d, f, p) {
	let m = /* @__PURE__ */ new WeakMap(), h = (e) => {
		let t = m.get(e);
		return t || (t = typeof o.value == "string" && o.value !== "" ? String(I(o.value, e)) : Array.isArray(o.value) ? o.value.map((t) => String(I(t, e))).join(" ") : Object.values(e).map(String).join(" "), m.set(e, t)), t;
	}, g = n(() => {
		if (r.value || s.value === "") return i.value;
		if (c.value === "regex") {
			let e;
			try {
				e = new RegExp(s.value, "i");
			} catch {
				return i.value;
			}
			return i.value.filter((t) => e.test(h(t)));
		}
		let e = s.value.toLowerCase();
		return i.value.filter((t) => h(t).toLowerCase().includes(e));
	}), _ = (e, t) => {
		let n = F(e) ? e : parseFloat(String(e));
		if (isNaN(n)) return !1;
		if (t.comparison === "between" && Array.isArray(t.criteria)) {
			let [e, r] = t.criteria;
			return n >= e && n <= r;
		}
		let r = t.criteria;
		switch (t.comparison) {
			case ">": return n > r;
			case ">=": return n >= r;
			case "<": return n < r;
			case "<=": return n <= r;
			default: return !1;
		}
	}, v = n(() => t.value?.length ? g.value.filter((e) => t.value.every((t) => {
		let n = I(t.field, e);
		return P(t) ? t.comparison(n, t.criteria) : Te(t) ? _(n, t) : Ee(t) ? t.criteria.includes(n) : t.comparison === "=" ? n === t.criteria : n !== t.criteria;
	})) : g.value), y = (e, t, n) => e === t ? 0 : e == null ? 1 : t == null ? -1 : e < t ? n ? 1 : -1 : n ? -1 : 1, b = (e, t, n, r) => r < 0 ? e : b(e, t, n, r - 1).sort((e, i) => {
		if (!t.slice(0, r).every((t) => I(t, e) === I(t, i))) return 0;
		let a = t[r];
		return y(I(a, e), I(a, i), n[r]);
	}), x = n(() => {
		if (r.value) return i.value;
		if (!e.value) return v.value;
		let { sortBy: t, sortDesc: n } = e.value, a = [...v.value];
		return u.value && Array.isArray(t) && Array.isArray(n) ? t.length ? b(a, t, n, t.length - 1) : a : a.sort((e, r) => y(I(t, e), I(t, r), n));
	}), S = n(() => r.value ? l.value : x.value.length), C = n(() => r.value ? !1 : (r.value ? l.value : i.value.length) >= d.value), { selectedItems: w, toggleSelectAll: T, toggleSelectItem: E, isProcessing: ee, selectionProgress: D } = je(x, a, f, p), O = n({
		get: () => a.value ?? [],
		set: (e) => {
			p("update:itemsSelected", e);
		}
	}), te = (e) => e.filter((e) => !f(e)), k = (e) => {
		O.value = e ? te(x.value) : O.value = [], e && p("selectAll");
	}, A = (e) => {
		let t = e.checkbox;
		if (delete e.checkbox, delete e.index, t) O.value = O.value.filter((t) => JSON.stringify(t) !== JSON.stringify(e)), p("deselectRow", e);
		else {
			let t = O.value;
			t.unshift(e), O.value = t, p("selectRow", e);
		}
	};
	return {
		totalItems: x,
		selectItemsComputed: O,
		totalItemsLength: S,
		toggleSelectAll: (e) => {
			if (!x.value.every((e) => f(e))) if (C.value) {
				p("updateSelectionStatus", !0);
				try {
					T(e), p("update:itemsSelected", e ? Array.from(w.value) : []), e && p("selectAll");
				} finally {
					p("updateSelectionStatus", !1);
				}
			} else k(e);
		},
		toggleSelectItem: (e) => {
			f(e) || (C.value ? E(e) : A(e));
		},
		isProcessing: n(() => C.value && ee.value),
		processProgress: D
	};
}
//#endregion
//#region src/components/icons/IconNextPage.vue
var Ne = {}, Pe = {
	class: "h-[18px] w-[18px]",
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor"
};
function Fe(e, t) {
	return b(), a("svg", Pe, t[0] ||= [o("path", {
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 5l7 7-7 7"
	}, null, -1)]);
}
var Ie = /*#__PURE__*/ j(Ne, [["render", Fe]]), R = {}, Le = {
	class: "h-[18px] w-[18px]",
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor"
};
function Re(e, t) {
	return b(), a("svg", Le, t[0] ||= [o("path", {
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 19l-7-7 7-7"
	}, null, -1)]);
}
var ze = /*#__PURE__*/ j(R, [["render", Re]]), Be = {}, Ve = { class: "px-3 py-1.5" };
function He(e, t) {
	return b(), a("span", Ve, t[0] ||= [o("svg", {
		class: "w-4 h-4",
		fill: "currentColor",
		viewBox: "0 0 24 24"
	}, [o("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })], -1)]);
}
var z = /*#__PURE__*/ j(Be, [["render", He]]), Ue = {}, B = {
	class: "w-4 h-4 transition-transform",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24"
};
function We(e, t) {
	return b(), a("svg", B, t[0] ||= [o("path", {
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 5l7 7-7 7"
	}, null, -1)]);
}
var Ge = /*#__PURE__*/ j(Ue, [["render", We]]), Ke = {}, qe = {
	class: "w-3 h-3 transition-transform",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24"
};
function Je(e, t) {
	return b(), a("svg", qe, t[0] ||= [o("path", {
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 15l7-7 7 7"
	}, null, -1)]);
}
var Ye = /*#__PURE__*/ j(Ke, [["render", Je]]), Xe = /* @__PURE__ */ u({
	__name: "HeaderSortIcon",
	props: { sortType: {} },
	setup(e) {
		return (e, t) => (b(), a("span", {
			key: e.sortType,
			class: m(["inline-flex transition-opacity duration-200", [e.sortType === "none" ? "opacity-0" : "opacity-100", "group-hover:opacity-100"]])
		}, [l(Ye, { class: m({ "transform rotate-180": e.sortType === "desc" }) }, null, 8, ["class"])], 2));
	}
}), Ze = [
	"checked",
	"disabled",
	"aria-checked"
], V = {
	class: "h-4 w-4 text-white stroke-3",
	fill: "none",
	viewBox: "1 1 24 24",
	stroke: "currentColor"
}, Qe = {
	class: "h-4 w-4 text-white",
	fill: "none",
	viewBox: "1 1 24 24",
	stroke: "currentColor"
}, $e = /* @__PURE__ */ u({
	__name: "BaseCheckbox",
	props: {
		checked: {
			type: Boolean,
			default: !1
		},
		partial: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["change"],
	setup(e) {
		let t = e, r = n(() => t.checked), i = n(() => t.partial);
		return (e, t) => (b(), a("div", {
			class: m(["relative inline-flex items-center justify-center h-5 w-5", [!e.disabled && "cursor-pointer group", e.disabled && "cursor-not-allowed opacity-50"]]),
			onClick: t[0] ||= re((t) => !e.disabled && e.$emit("change"), ["stop", "prevent"])
		}, [o("input", {
			type: "checkbox",
			class: "sr-only peer",
			checked: r.value,
			disabled: e.disabled,
			"aria-checked": r.value
		}, null, 8, Ze), o("div", { class: m(["h-4 w-4 rounded-sm transition-all duration-200 border", [
			r.value && !i.value && ["bg-vdt-primary-500 border-vdt-primary-500", !e.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"],
			i.value && ["bg-vdt-primary-500 border-vdt-primary-500", !e.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"],
			!r.value && !i.value && ["border-gray-300 bg-white", !e.disabled && "group-hover:border-vdt-primary-300"],
			!e.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-vdt-primary-500/50"
		]]) }, [ne((b(), a("svg", V, t[1] ||= [o("path", {
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			d: "M5 13l4 4L19 7"
		}, null, -1)], 512)), [[te, r.value && !i.value]]), ne((b(), a("svg", Qe, t[2] ||= [o("path", {
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"stroke-width": "2.5",
			d: "M20 12H4"
		}, null, -1)], 512)), [[te, i.value]])], 2)], 2));
	}
}), et = /* @__PURE__ */ u({
	__name: "SingleSelectCheckBox",
	props: {
		checked: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = t;
		return (e, t) => (b(), r($e, {
			checked: e.checked,
			disabled: e.disabled,
			partial: !1,
			onChange: t[0] ||= (e) => n("change")
		}, null, 8, ["checked", "disabled"]));
	}
}), tt = /* @__PURE__ */ u({
	__name: "MultipleSelectCheckBox",
	props: {
		status: {
			type: String,
			required: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["change"],
	setup(e, { emit: t }) {
		let i = e, a = n(() => i.status === "allSelected"), o = n(() => i.status === "partSelected"), s = t;
		return (t, n) => (b(), r(et, {
			checked: a.value,
			partial: o.value,
			disabled: e.disabled,
			onChange: n[0] ||= (e) => s("change", !a.value)
		}, null, 8, [
			"checked",
			"partial",
			"disabled"
		]));
	}
}), H = {
	key: 1,
	class: "items-center gap-2"
}, nt = {
	key: 1,
	class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, rt = /* @__PURE__ */ u({
	__name: "TableHeaderCell",
	props: {
		header: {
			type: Object,
			required: !0
		},
		index: {
			type: Number,
			required: !0
		},
		fixedDistance: String,
		lastLeftFixedColumn: String,
		firstRightFixedColumn: String,
		headerItemClassName: {
			type: [String, Function],
			default: ""
		},
		areAllVisibleRowsDisabled: Boolean,
		multipleSelectStatus: {
			type: String,
			default: "noneSelected"
		},
		multiSort: Boolean,
		isMultiSorting: {
			type: Function,
			required: !0
		},
		getMultiSortNumber: {
			type: Function,
			required: !0
		}
	},
	emits: ["headerClick", "toggleSelectAll"],
	setup(e, { emit: t }) {
		let n = t, s = O(), c = (e) => [
			`header-${e.value}`,
			`header-${e.value.toLowerCase()}`,
			"header"
		].find((e) => s[e]) || "header", l = (e) => {
			e.sortable && e.sortType && n("headerClick", e);
		};
		return (t, n) => (b(), a("th", {
			style: g(e.fixedDistance),
			class: m(["vdt-thead-th px-4 py-3 font-semibold tracking-wider bg-gray-200 dark:bg-gray-700 group", [
				"px-4 py-3 font-semibold tracking-wider group",
				{
					"cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600": e.header.sortable,
					"shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.lastLeftFixedColumn,
					"shadow-[-1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.firstRightFixedColumn
				},
				e.header.sortable && {
					"bg-gray-200": e.header.sortType === "none",
					"bg-gray-300": e.header.sortType && ["desc", "asc"].includes(e.header.sortType)
				},
				typeof e.headerItemClassName == "string" ? e.headerItemClassName : e.headerItemClassName(e.header, e.index + 1)
			]]),
			onClick: n[1] ||= re((t) => l(e.header), ["stop"])
		}, [e.header.text === "checkbox" ? (b(), r(tt, {
			key: 0,
			disabled: e.areAllVisibleRowsDisabled,
			status: e.multipleSelectStatus,
			onChange: n[0] ||= (e) => t.$emit("toggleSelectAll", e)
		}, null, 8, ["disabled", "status"])) : (b(), a("div", H, [
			w(t.$slots, c(e.header), h(d({
				header: e.header,
				index: e.index,
				sortable: e.header.sortable
			})), () => [o("span", null, T(e.header.text), 1)]),
			e.header.sortable ? (b(), r(D(Xe), {
				key: 0,
				"sort-type": e.header.sortType || "none"
			}, null, 8, ["sort-type"])) : i("", !0),
			e.multiSort && e.isMultiSorting(e.header.value) ? (b(), a("span", nt, T(e.getMultiSortNumber(e.header.value)), 1)) : i("", !0)
		]))], 6));
	}
}), it = /* @__PURE__ */ u({
	__name: "TableHeader",
	props: {
		headers: {
			type: Array,
			required: !0
		},
		hideHeader: Boolean,
		fixedHeader: Boolean,
		headerClassName: String,
		borderCell: Boolean,
		lastLeftFixedColumn: String,
		firstRightFixedColumn: String,
		headerItemClassName: {
			type: [String, Function],
			default: ""
		},
		areAllVisibleRowsDisabled: Boolean,
		multipleSelectStatus: String,
		multiSort: Boolean,
		isMultiSorting: {
			type: Function,
			required: !0
		},
		getMultiSortNumber: {
			type: Function,
			required: !0
		},
		getFixedDistance: {
			type: Function,
			required: !0
		}
	},
	emits: ["headerClick", "toggleSelectAll"],
	setup(t, { emit: n }) {
		let c = n, l = (e) => {
			c("headerClick", e);
		}, u = (e) => {
			c("toggleSelectAll", e);
		};
		return (n, c) => t.headers.length && !t.hideHeader ? (b(), a("thead", {
			key: 0,
			class: m(["vdt-thead", [
				"text-sm  text-vdt-content-secondary uppercase text-nowrap text-left",
				{ "sticky top-0 z-10": t.fixedHeader },
				t.headerClassName
			]])
		}, [o("tr", { class: m(["vdt-thead-tr", [{ "divide-x divide-gray-300 dark:divide-gray-600": t.borderCell }]]) }, [(b(!0), a(e, null, C(t.headers, (e, i) => (b(), r(rt, {
			key: i,
			header: e,
			index: i,
			"fixed-distance": t.getFixedDistance(e.value),
			"last-left-fixed-column": t.lastLeftFixedColumn,
			"first-right-fixed-column": t.firstRightFixedColumn,
			"header-item-class-name": t.headerItemClassName,
			"are-all-visible-rows-disabled": t.areAllVisibleRowsDisabled,
			"multiple-select-status": t.multipleSelectStatus,
			"multi-sort": t.multiSort,
			"is-multi-sorting": t.isMultiSorting,
			"get-multi-sort-number": t.getMultiSortNumber,
			onHeaderClick: l,
			onToggleSelectAll: u
		}, s({ _: 2 }, [C(n.$slots, (e, t) => ({
			name: t,
			fn: A((e) => [w(n.$slots, t, p({ ref_for: !0 }, e))])
		}))]), 1032, [
			"header",
			"index",
			"fixed-distance",
			"last-left-fixed-column",
			"first-right-fixed-column",
			"header-item-class-name",
			"are-all-visible-rows-disabled",
			"multiple-select-status",
			"multi-sort",
			"is-multi-sorting",
			"get-multi-sort-number"
		]))), 128))], 2)], 2)) : i("", !0);
	}
}), at = /* @__PURE__ */ u({
	__name: "TableBodyCell",
	props: {
		column: {},
		item: {},
		index: {},
		style: {},
		isDisabled: { type: Boolean },
		expandColumn: {},
		isExpanded: { type: Boolean },
		bodyItemClassName: { type: [String, Function] },
		getFixedDistance: { type: Function },
		getFixedColumnClasses: { type: Function }
	},
	emits: ["toggle-select", "toggle-expand"],
	setup(e, { emit: t }) {
		let r = e, i = t, s = n(() => r.isDisabled ?? !1), u = n(() => typeof r.bodyItemClassName == "function" ? r.bodyItemClassName(r.column, r.index) : r.bodyItemClassName), f = n(() => r.column === "expand" || r.column === r.expandColumn), _ = n(() => {
			if (r.getFixedDistance) return r.getFixedDistance(r.column, "td");
		}), v = n(() => r.getFixedColumnClasses && r.getFixedColumnClasses(r.column) || []), y = n(() => {
			let e = r.style || "";
			return _.value && (e += _.value), v.value.length > 0 && (e += " background-color: inherit;"), e;
		}), x = (e) => {
			f.value && r.expandColumn === "" && i("toggle-expand", e);
		}, S = (e) => {
			i("toggle-expand", e);
		}, C = () => {
			i("toggle-select");
		};
		return (e, t) => (b(), a("td", {
			class: m(["vdt-tbody-td px-4 py-2", [
				{ "cursor-pointer": e.column === "expand" && e.expandColumn === "" },
				...v.value,
				u.value
			]]),
			style: g(y.value),
			onClick: x
		}, [e.column === "checkbox" ? w(e.$slots, "selection-checkbox", h(p({ key: 0 }, {
			item: e.item,
			index: e.index,
			isDisabled: s.value,
			toggleSelectItem: C
		})), () => [l(et, {
			checked: !!e.item.checkbox,
			disabled: s.value,
			onChange: C
		}, null, 8, ["checked", "disabled"])]) : f.value ? w(e.$slots, "expand-button", h(p({ key: 1 }, {
			item: e.item,
			expanded: e.isExpanded,
			toggle: S
		})), () => [o("button", {
			onClick: re(S, ["stop"]),
			class: "inline-flex items-center"
		}, [l(D(Ge), { class: m({ "transform rotate-90": e.isExpanded }) }, null, 8, ["class"])])]) : w(e.$slots, `item-${e.column}`, h(p({ key: 2 }, e.item)), () => [w(e.$slots, `item-${e.column.toLowerCase()}`, h(d(e.item)), () => [w(e.$slots, "item", h(d({
			column: e.column,
			item: e.item
		})), () => [c(T(D(Oe)(e.column, e.item)), 1)])])])], 6));
	}
}), ot = /* @__PURE__ */ u({
	__name: "TableBodyRow",
	props: {
		item: {},
		index: {},
		columns: {},
		alternating: { type: Boolean },
		noHover: { type: Boolean },
		borderRow: { type: Boolean },
		borderCell: { type: Boolean },
		bodyRowClassName: { type: [String, Function] },
		isExpanded: { type: Boolean },
		isDisabled: { type: Boolean },
		expandColumn: {},
		getFixedDistance: { type: Function },
		getFixedColumnClasses: { type: Function },
		bodyItemClassName: { type: [String, Function] }
	},
	emits: [
		"click",
		"dblclick",
		"contextmenu",
		"toggle-expand",
		"toggle-select"
	],
	setup(t, { emit: i }) {
		let o = t, c = i, l = n(() => typeof o.bodyRowClassName == "function" ? o.bodyRowClassName(o.item, o.index) : o.bodyRowClassName), u = (e) => {
			c("click", e, o.item, o.index);
		}, d = (e) => {
			c("dblclick", e, o.item, o.index);
		}, f = (e) => {
			c("contextmenu", e, o.item);
		};
		return (t, n) => (b(), a("tr", {
			class: m(["vdt-tbody-tr transition-colors text-vdt-content", [
				{ "bg-vdt-surface": t.alternating && t.index % 2 == 0 },
				{ "bg-vdt-surface-secondary": !t.alternating || t.index % 2 == 1 },
				{ "hover:bg-vdt-interactive-hover": !t.noHover },
				{ "divide-x border-vdt-outline": t.borderCell },
				{ "border-b border-vdt-outline last:border-b-0 first:border-t": t.borderRow },
				l.value
			]]),
			onClick: u,
			onDblclick: d,
			onContextmenu: f
		}, [
			w(t.$slots, "prepend"),
			(b(!0), a(e, null, C(t.columns, (e, i) => (b(), r(at, {
				key: i,
				column: e,
				item: t.item,
				index: t.index,
				"get-fixed-distance": t.getFixedDistance,
				"get-fixed-column-classes": t.getFixedColumnClasses,
				"is-disabled": t.isDisabled,
				"expand-column": t.expandColumn,
				"is-expanded": t.isExpanded,
				"body-item-class-name": t.bodyItemClassName,
				onToggleExpand: n[0] ||= (e) => t.$emit("toggle-expand", e, t.index, t.item),
				onToggleSelect: n[1] ||= () => t.$emit("toggle-select", t.item)
			}, s({ _: 2 }, [C(t.$slots, (e, n) => ({
				name: n,
				fn: A((e) => [w(t.$slots, n, p({ ref_for: !0 }, e))])
			}))]), 1032, [
				"column",
				"item",
				"index",
				"get-fixed-distance",
				"get-fixed-column-classes",
				"is-disabled",
				"expand-column",
				"is-expanded",
				"body-item-class-name"
			]))), 128)),
			w(t.$slots, "append")
		], 34));
	}
}), U = {}, st = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" };
function ct(e, t) {
	return b(), a("div", st, t[0] ||= [o("div", { class: "absolute h-[3px] w-2/5 animate-loading-line bg-vdt-primary-500" }, null, -1)]);
}
var lt = /*#__PURE__*/ j(U, [["render", ct], ["__scopeId", "data-v-9ef81a40"]]), ut = ["colspan"], W = { class: "overflow-hidden" }, dt = /* @__PURE__ */ u({
	__name: "TableExpandRow",
	props: {
		item: {},
		index: {},
		columnsCount: {},
		loading: { type: Boolean },
		isExpanded: { type: Boolean },
		bodyExpandRowClassName: { type: [String, Function] }
	},
	setup(e) {
		let t = e, s = n(() => typeof t.bodyExpandRowClassName == "function" ? t.bodyExpandRowClassName(t.item, t.index) : t.bodyExpandRowClassName);
		return (e, t) => (b(), a("tr", { class: m(["vdt-expand-row border-0", [s.value, {
			"bg-gray-50": (e.index + 1) % 2 == 0,
			"border-t": e.isExpanded
		}]]) }, [o("td", {
			colspan: e.columnsCount,
			class: "relative p-0"
		}, [e.loading ? (b(), r(lt, {
			key: 0,
			class: "mb-4"
		})) : i("", !0), o("div", { class: m(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": e.isExpanded }]]) }, [o("div", W, [w(e.$slots, "default", {
			isExpanded: e.isExpanded,
			item: e.item,
			index: e.index
		})])], 2)], 8, ut)], 2));
	}
}), G = { class: "flex items-center gap-2 text-sm text-vdt-content-secondary" }, K = { class: "relative inline-block min-w-[70px]" }, q = ["aria-expanded"], J = { class: "block truncate" }, Y = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, X = ["aria-selected", "onClick"], ft = {
	key: 0,
	class: "absolute inset-y-0 right-0 flex items-center pr-4 text-vdt-primary-600"
}, pt = /* @__PURE__ */ u({
	__name: "RowsPerPageSelector",
	props: {
		modelValue: {
			type: Number,
			requilime: !0
		},
		rowsItems: {
			type: Array,
			required: !0
		},
		message: {
			type: String,
			default: "Rows per page:"
		}
	},
	emits: ["update:modelValue"],
	setup(r, { emit: s }) {
		let u = r, d = s, p = S(!1), h = S(!1), g = n({
			get: () => u.modelValue,
			set: (e) => d("update:modelValue", e)
		}), y = f("dataTable");
		k(p, (e) => {
			if (e && y?.value) {
				let e = window.innerHeight, t = y.value.getBoundingClientRect();
				h.value = e - (t.height + t.top) <= 100;
			}
		});
		let x = (e) => {
			g.value = e, p.value = !1;
		}, w = () => {
			p.value = !p.value;
		}, E = (e) => {
			e.target.closest(".relative") || (p.value = !1);
		}, ee = (e) => {
			e.relatedTarget?.closest(".relative") || (p.value = !1);
		};
		return v(() => {
			document.addEventListener("click", E);
		}), _(() => {
			document.removeEventListener("click", E);
		}), (n, s) => (b(), a("div", G, [c(T(r.message) + " ", 1), o("div", K, [o("button", {
			type: "button",
			class: m(["relative w-full cursor-pointer rounded-md bg-vdt-surface py-1.5 pl-3 pr-8 text-left text-sm shadow-xs border border-vdt-outline", ["focus:border-vdt-primary-500 focus:outline-hidden focus:ring-1 focus:ring-vdt-primary-500", p.value ? "ring-1 ring-vdt-primary-500 border-vdt-primary-500" : "hover:border-gray-400"]]),
			onClick: w,
			"aria-haspopup": "listbox",
			"aria-expanded": p.value
		}, [o("span", J, T(g.value), 1), o("span", Y, [(b(), a("svg", {
			class: m(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": p.value }]),
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor"
		}, s[0] ||= [o("path", {
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"stroke-width": "2",
			d: "M19 9l-7 7-7-7"
		}, null, -1)], 2))])], 10, q), l(t, {
			"enter-active-class": "transition duration-100 ease-out",
			"enter-from-class": "transform scale-95 opacity-0",
			"enter-to-class": "transform scale-100 opacity-100",
			"leave-active-class": "transition duration-75 ease-in",
			"leave-from-class": "transform scale-100 opacity-100",
			"leave-to-class": "transform scale-95 opacity-0"
		}, {
			default: A(() => [p.value ? (b(), a("ul", {
				key: 0,
				class: m(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-vdt-surface py-1 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 ring-opacity-5 focus:outline-hidden", { "bottom-full mb-1": h.value }]),
				tabindex: "-1",
				role: "listbox",
				onFocusout: ee
			}, [(b(!0), a(e, null, C(r.rowsItems, (e) => (b(), a("li", {
				key: e,
				class: m(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [e === g.value ? "text-vdt-primary-800 bg-vdt-primary-100 font-semibold" : "text-vdt-content hover:bg-vdt-interactive-hover"]]),
				role: "option",
				"aria-selected": e === g.value,
				onClick: (t) => x(e)
			}, [o("span", { class: m(["block", { "font-medium": e === g.value }]) }, T(e), 3), e === g.value ? (b(), a("span", ft, s[1] ||= [o("svg", {
				class: "h-4 w-4",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor"
			}, [o("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-width": "2",
				d: "M5 13l4 4L19 7"
			})], -1)])) : i("", !0)], 10, X))), 128))], 34)) : i("", !0)]),
			_: 1
		})])]));
	}
}), mt = { class: "text-sm text-vdt-content-secondary" }, ht = /* @__PURE__ */ u({
	__name: "PaginationInfo",
	props: {
		currentPageFirstIndex: {},
		currentPageLastIndex: {},
		totalItemsLength: {},
		rowsOfPageSeparatorMessage: {}
	},
	setup(e) {
		return (e, t) => (b(), a("div", mt, [w(e.$slots, "default", {
			firstIndex: e.currentPageFirstIndex,
			lastIndex: e.currentPageLastIndex,
			total: e.totalItemsLength,
			separator: e.rowsOfPageSeparatorMessage
		}, () => [c(T(`${e.currentPageFirstIndex}–${e.currentPageLastIndex}`) + " " + T(e.rowsOfPageSeparatorMessage) + " " + T(e.totalItemsLength), 1)])]));
	}
}), Z = {
	class: "vdt-pagination flex items-center space-x-2",
	role: "navigation",
	"aria-label": "Pagination navigation"
}, Q = ["disabled"], gt = ["disabled"], _t = /* @__PURE__ */ u({
	__name: "PaginationArrows",
	props: {
		isFirstPage: {
			type: Boolean,
			required: !0,
			default: !1
		},
		isLastPage: {
			type: Boolean,
			required: !0,
			default: !1
		}
	},
	emits: ["clickPrevPage", "clickNextPage"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (b(), a("div", Z, [
			o("button", {
				type: "button",
				class: m(["relative inline-flex items-center p-1.5 rounded-md border transition-colors border-vdt-outline bg-vdt-surface", [e.isFirstPage ? ["text-vdt-content-muted cursor-not-allowed", "hover:bg-vdt-surface"] : ["text-vdt-content-secondary", "hover:bg-vdt-interactive-hover hover:text-vdt-content"]]]),
				disabled: e.isFirstPage,
				onClick: r[0] ||= (e) => n("clickPrevPage"),
				"aria-label": "Previous page"
			}, [l(D(ze), { class: m({ "opacity-50": e.isFirstPage }) }, null, 8, ["class"])], 10, Q),
			w(t.$slots, "buttonsPagination"),
			o("button", {
				type: "button",
				class: m(["relative inline-flex items-center p-1.5 rounded-md border transition-colors border-vdt-outline bg-vdt-surface", [e.isLastPage ? ["text-vdt-content-muted cursor-not-allowed", "hover:bg-vdt-surface"] : ["text-vdt-content-secondary", "hover:bg-vdt-interactive-hover hover:text-vdt-content"]]]),
				disabled: e.isLastPage,
				onClick: r[1] ||= (e) => n("clickNextPage"),
				"aria-label": "Next page"
			}, [l(D(Ie), { class: m({ "opacity-50": e.isLastPage }) }, null, 8, ["class"])], 10, gt)
		]));
	}
}), vt = {
	class: "vdt-pagination inline-flex rounded-md shadow-xs",
	role: "navigation",
	"aria-label": "Pagination"
}, yt = ["onClick"], $ = 7, bt = /* @__PURE__ */ u({
	__name: "ButtonsPagination",
	props: {
		maxPaginationNumber: {
			type: Number,
			required: !0
		},
		currentPaginationNumber: {
			type: Number,
			required: !0
		}
	},
	emits: ["updatePage"],
	setup(t, { emit: i }) {
		let o = t, s = i, c = (e) => {
			e.type === "button" && !e.active && s("updatePage", e.page);
		}, l = n(() => {
			let e = [], { maxPaginationNumber: t, currentPaginationNumber: n } = o;
			if (t <= $) {
				for (let r = 1; r <= t; r += 1) e.push({
					type: "button",
					page: r,
					active: r === n,
					activePrev: r + 1 === n
				});
				return e;
			}
			if ([
				1,
				2,
				t,
				t - 1
			].includes(n)) for (let r = 1; r <= $; r += 1) if (r <= 3) e.push({
				type: "button",
				page: r,
				active: r === n,
				activePrev: r + 1 === n
			});
			else if (r === 4) e.push({ type: "omission" });
			else {
				let i = t - ($ - r);
				e.push({
					type: "button",
					page: i,
					active: i === n,
					activePrev: i + 1 === n
				});
			}
			else if ([3, 4].includes(n)) for (let r = 1; r <= $; r += 1) r <= 5 ? e.push({
				type: "button",
				page: r,
				active: r === n,
				activePrev: r + 1 === n
			}) : r === 6 ? e.push({ type: "omission" }) : e.push({
				type: "button",
				page: t,
				active: t === n,
				activePrev: !1
			});
			else if ([t - 2, t - 3].includes(n)) for (let r = 1; r <= $; r += 1) if (r === 1) e.push({
				type: "button",
				page: 1,
				active: n === 1,
				activePrev: !1
			});
			else if (r === 2) e.push({ type: "omission" });
			else {
				let i = t - ($ - r);
				e.push({
					type: "button",
					page: i,
					active: i === n,
					activePrev: i + 1 === n
				});
			}
			else for (let r = 1; r <= $; r += 1) if (r === 1) e.push({
				type: "button",
				page: 1,
				active: n === 1,
				activePrev: !1
			});
			else if (r === 2 || r === 6) e.push({ type: "omission" });
			else if (r === 7) e.push({
				type: "button",
				page: t,
				active: t === n,
				activePrev: !1
			});
			else {
				let t = n - (4 - r);
				e.push({
					type: "button",
					page: t,
					active: t === n,
					activePrev: t + 1 === n
				});
			}
			return e;
		});
		return (t, n) => (b(), a("div", vt, [(b(!0), a(e, null, C(l.value, (e, t) => (b(), a("div", {
			key: t,
			class: m(["relative inline-flex items-center justify-center", [
				"min-w-[32px] h-8 text-sm transition-colors",
				t === 0 && "rounded-l-md",
				t === l.value.length - 1 && "rounded-r-md",
				e.type === "button" && [
					"border border-vdt-outline",
					e.active ? [
						"z-10",
						"bg-vdt-primary-500 border-vdt-primary-500 text-white",
						"relative"
					] : [
						"bg-vdt-surface",
						"text-vdt-content",
						"hover:bg-vdt-interactive-hover",
						"focus:z-10 focus:outline-hidden focus:ring-1",
						"focus:ring-vdt-primary-500",
						"focus:border-vdt-primary-500"
					],
					!e.active && "cursor-pointer",
					t !== 0 && "-ml-px"
				],
				e.type === "omission" && ["bg-vdt-surface border border-vdt-outline text-vdt-content-muted", t !== 0 && "-ml-px"]
			]]),
			onClick: (t) => c(e)
		}, [e.type === "button" ? (b(), a("span", {
			key: 0,
			class: m(["px-3 py-1.5", { "font-medium": e.active }])
		}, T(e.page), 3)) : (b(), r(D(z), { key: 1 }))], 10, yt))), 128))]));
	}
}), xt = { class: "flex-1 flex justify-center" }, St = { class: "text-sm text-vdt-content px-3" }, Ct = { class: "flex-1 flex items-center justify-start" }, wt = {
	key: 0,
	class: "text-sm"
}, Tt = { class: "flex-1 flex items-center justify-center" }, Et = {
	key: 0,
	class: "text-sm"
}, Dt = { class: "flex-1 flex items-center justify-end" }, Ot = /* @__PURE__ */ u({
	__name: "TableFooter",
	props: {
		hideRowsPerPage: { type: Boolean },
		hidePaginationInfo: { type: Boolean },
		buttonsPagination: { type: Boolean },
		showShadow: { type: Boolean },
		footerClassName: { default: "" },
		mobileFooterClasses: { default: "" },
		desktopFooterClasses: { default: "" },
		rowsPerPage: {},
		rowsItems: {},
		rowsPerPageMessage: {},
		rowsOfPageSeparatorMessage: {},
		currentPageFirstIndex: {},
		currentPageLastIndex: {},
		totalItemsLength: {},
		currentPaginationNumber: {},
		maxPaginationNumber: {},
		isFirstPage: { type: Boolean },
		isLastPage: { type: Boolean }
	},
	emits: [
		"update:rowsPerPage",
		"nextPage",
		"prevPage",
		"updatePage"
	],
	setup(e, { emit: t }) {
		let r = e, c = t, u = n(() => ({
			...r,
			paginationInfo: {
				currentPageFirstIndex: r.currentPageFirstIndex,
				currentPageLastIndex: r.currentPageLastIndex,
				totalItemsLength: r.totalItemsLength,
				rowsOfPageSeparatorMessage: r.rowsOfPageSeparatorMessage
			},
			pagination: {
				isFirstPage: r.isFirstPage,
				isLastPage: r.isLastPage,
				currentPaginationNumber: r.currentPaginationNumber,
				maxPaginationNumber: r.maxPaginationNumber,
				buttonsPagination: r.buttonsPagination,
				nextPage: () => c("nextPage"),
				prevPage: () => c("prevPage"),
				updatePage: (e) => c("updatePage", e)
			},
			rowsPerPage: {
				current: r.rowsPerPage,
				options: r.rowsItems,
				message: r.rowsPerPageMessage,
				update: (e) => c("update:rowsPerPage", e)
			},
			updateRowsPerPage: (e) => c("update:rowsPerPage", e),
			nextPage: () => c("nextPage"),
			prevPage: () => c("prevPage"),
			updatePage: (e) => c("updatePage", e)
		}));
		return (e, t) => (b(), a("div", { class: m(["vdt-footer", [
			"bg-vdt-surface border border-vdt-outline border-t-0",
			{ "shadow-sm": e.showShadow },
			e.footerClassName
		]]) }, [w(e.$slots, "footer-mobile", h(d(u.value)), () => [o("div", { class: m(["vdt-footer-mobile sm:hidden px-4 py-3 w-full", e.mobileFooterClasses]) }, [l(_t, {
			"is-first-page": e.isFirstPage,
			"is-last-page": e.isLastPage,
			onClickNextPage: t[0] ||= () => c("nextPage"),
			onClickPrevPage: t[1] ||= () => c("prevPage"),
			class: "sm:hidden flex items-center justify-between w-full"
		}, {
			buttonsPagination: A(() => [o("div", xt, [o("span", St, T(e.currentPaginationNumber) + " / " + T(e.maxPaginationNumber), 1)])]),
			_: 1
		}, 8, ["is-first-page", "is-last-page"])], 2)]), w(e.$slots, "footer-desktop", h(d(u.value)), () => [o("div", { class: m(["vdt-footer-desktop hidden sm:flex items-center justify-between px-4 py-3 w-full", e.desktopFooterClasses]) }, [
			o("div", Ct, [w(e.$slots, "rows-per-page", p(u.value.rowsPerPage, { rawProps: u.value }), () => [e.hideRowsPerPage ? i("", !0) : (b(), a("div", wt, [l(pt, {
				"model-value": e.rowsPerPage,
				"rows-items": e.rowsItems,
				message: e.rowsPerPageMessage,
				"onUpdate:modelValue": t[2] ||= (e) => c("update:rowsPerPage", e)
			}, null, 8, [
				"model-value",
				"rows-items",
				"message"
			])]))])]),
			o("div", Tt, [w(e.$slots, "pagination-info", p(u.value.paginationInfo, { rawProps: u.value }), () => [e.hidePaginationInfo ? i("", !0) : (b(), a("div", Et, [l(ht, {
				"current-page-first-index": e.currentPageFirstIndex,
				"current-page-last-index": e.currentPageLastIndex,
				"total-items-length": e.totalItemsLength,
				"rows-of-page-separator-message": e.rowsOfPageSeparatorMessage
			}, null, 8, [
				"current-page-first-index",
				"current-page-last-index",
				"total-items-length",
				"rows-of-page-separator-message"
			])]))])]),
			o("div", Dt, [w(e.$slots, "pagination", p(u.value.pagination, { rawProps: u.value }), () => [l(_t, {
				"is-first-page": e.isFirstPage,
				"is-last-page": e.isLastPage,
				onClickNextPage: t[4] ||= () => c("nextPage"),
				onClickPrevPage: t[5] ||= () => c("prevPage")
			}, s({ _: 2 }, [e.buttonsPagination ? {
				name: "buttonsPagination",
				fn: A(() => [l(bt, {
					"current-pagination-number": e.currentPaginationNumber,
					"max-pagination-number": e.maxPaginationNumber,
					onUpdatePage: t[3] ||= (e) => c("updatePage", e)
				}, null, 8, ["current-pagination-number", "max-pagination-number"])]),
				key: "0"
			} : void 0]), 1032, ["is-first-page", "is-last-page"])])])
		], 2)])], 2));
	}
}), kt = {
	slate: "oklch(55.4% 0.046 257.417)",
	gray: "oklch(55.1% 0.027 264.364)",
	zinc: "oklch(55.2% 0.016 285.938)",
	neutral: "oklch(55.6% 0 0)",
	stone: "oklch(55.3% 0.013 58.071)",
	red: "oklch(63.7% 0.237 25.331)",
	orange: "oklch(70.5% 0.213 47.604)",
	amber: "oklch(76.9% 0.188 70.08)",
	yellow: "oklch(79.5% 0.184 86.047)",
	lime: "oklch(76.8% 0.233 130.85)",
	green: "oklch(72.3% 0.219 149.579)",
	emerald: "oklch(69.6% 0.17 162.48)",
	teal: "oklch(70.4% 0.14 182.503)",
	cyan: "oklch(71.5% 0.143 215.221)",
	sky: "oklch(68.5% 0.169 237.323)",
	blue: "oklch(62.3% 0.214 259.815)",
	indigo: "oklch(58.5% 0.233 277.117)",
	violet: "oklch(60.6% 0.25 292.717)",
	purple: "oklch(62.7% 0.265 303.9)",
	fuchsia: "oklch(66.7% 0.295 322.15)",
	pink: "oklch(65.6% 0.241 354.308)",
	rose: "oklch(64.5% 0.246 16.439)"
};
function At(e) {
	return e in kt;
}
//#endregion
//#region src/composables/useTheme.ts
function jt(e) {
	return e ? At(e) ? kt[e] : e : kt.indigo;
}
function Mt(e, t) {
	return {
		themeStyle: n(() => ({ "--color-vdt-primary": jt(e.value) })),
		themeAttrs: n(() => {
			let e = {};
			return t.value && (e["data-vdt-mode"] = t.value), e;
		})
	};
}
//#endregion
//#region src/DataTable.vue?vue&type=script&setup=true&lang.ts
var Nt = ["id"], Pt = {
	key: 0,
	class: "absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50"
}, Ft = { class: "relative z-10" }, It = {
	key: 1,
	class: "flex items-center py-12 justify-center text-vdt-content-secondary bg-vdt-surface-elevated"
}, Lt = {
	key: 0,
	class: "vdt-footer-section"
}, Rt = /* @__PURE__ */ u({
	__name: "DataTable",
	props: {
		items: { default: () => [] },
		headers: { default: () => [] },
		currentPage: { default: 1 },
		rowsPerPage: { default: 25 },
		rowsItems: { default: () => [
			25,
			50,
			100
		] },
		hideFooter: {
			type: Boolean,
			default: !1
		},
		hideRowsPerPage: {
			type: Boolean,
			default: !1
		},
		rowsPerPageMessage: { default: "rows per page:" },
		rowsOfPageSeparatorMessage: { default: "of" },
		buttonsPagination: {
			type: Boolean,
			default: !0
		},
		hidePaginationInfo: { type: Boolean },
		sortBy: { default: "" },
		sortType: { default: "asc" },
		multiSort: {
			type: Boolean,
			default: !1
		},
		mustSort: {
			type: Boolean,
			default: !0
		},
		filterOptions: { default: null },
		searchField: { default: "" },
		searchValue: { default: "" },
		searchType: { default: "contains" },
		serverOptions: { default: null },
		serverItemsLength: { default: 0 },
		theme: { default: () => "indigo" },
		mode: {},
		alternating: {
			type: Boolean,
			default: !0
		},
		noHover: {
			type: Boolean,
			default: !1
		},
		borderCell: {
			type: Boolean,
			default: !1
		},
		borderRow: {
			type: Boolean,
			default: !0
		},
		checkboxColumnWidth: { default: null },
		expandColumnWidth: { default: 36 },
		indexColumnWidth: { default: 60 },
		showIndex: {
			type: Boolean,
			default: !1
		},
		showIndexSymbol: { default: "#" },
		fixedExpand: {
			type: Boolean,
			default: !1
		},
		fixedHeader: {
			type: Boolean,
			default: !1
		},
		fixedCheckbox: {
			type: Boolean,
			default: !1
		},
		fixedIndex: {
			type: Boolean,
			default: !1
		},
		wrapperClassName: { default: "" },
		containerClassName: { default: "" },
		tableClassName: { default: "" },
		headerClassName: { default: "" },
		bodyClassName: { default: "" },
		headerItemClassName: {
			type: [Function, String],
			default: ""
		},
		bodyRowClassName: {
			type: [Function, String],
			default: ""
		},
		bodyExpandRowClassName: {
			type: [Function, String],
			default: ""
		},
		bodyItemClassName: {
			type: [Function, String],
			default: ""
		},
		footerClassName: { default: "" },
		mobileFooterClasses: { default: "" },
		desktopFooterClasses: { default: "" },
		hideHeader: {
			type: Boolean,
			default: !1
		},
		itemsSelected: { default: null },
		clickRowToSelect: {
			type: Boolean,
			default: !1
		},
		disabledRows: {
			type: Function,
			default: () => !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		emptyMessage: { default: "No Available Data" },
		clickEventType: { default: "single" },
		clickRowToExpand: {
			type: Boolean,
			default: !1
		},
		tableNodeId: { default: "" },
		preventContextMenuRow: {
			type: Boolean,
			default: !1
		},
		expandColumn: { default: "" },
		expandTransition: {
			type: Boolean,
			default: void 0
		},
		batchSelectionThreshold: { default: 1e4 }
	},
	emits: [
		"clickRow",
		"contextmenuRow",
		"selectRow",
		"deselectRow",
		"expandRow",
		"updateSort",
		"update:itemsSelected",
		"update:serverOptions",
		"updatePageItems",
		"updateTotalItems",
		"selectAll",
		"updateSelectionStatus"
	],
	setup(t, { expose: u, emit: f }) {
		let _ = t, { checkboxColumnWidth: v, expandColumnWidth: y, indexColumnWidth: re, rowsItems: j, showIndexSymbol: ie, currentPage: ae, filterOptions: M, headers: se, itemsSelected: ce, loading: N, items: le, rowsPerPage: ue, searchField: ge, searchValue: _e, searchType: ve, serverItemsLength: ye, showIndex: be, sortBy: Te, sortType: Ee, serverOptions: P, multiSort: F, mustSort: De, clickEventType: I, clickRowToExpand: Oe, clickRowToSelect: ke, fixedExpand: Ae, fixedCheckbox: L, fixedIndex: je, batchSelectionThreshold: Ne, expandColumn: Pe } = ee(_), { themeStyle: Fe, themeAttrs: Ie } = Mt(E(_, "theme"), E(_, "mode")), R = O(), Le = n(() => !!R.expand), Re = n(() => !!R.body), ze = n(() => {
			let e = {};
			return [
				"rows-per-page",
				"pagination-info",
				"pagination"
			].forEach((t) => {
				R[t] && (e[t] = R[t]);
			}), Object.keys(R).forEach((t) => {
				t.startsWith("footer-") && t !== "footer-content" && (e[t] = R[t]);
			}), e;
		}), Be = n(() => _.expandTransition === void 0 ? Le.value : _.expandTransition), Ve = S(null), He = S(null);
		x("dataTable", Ve);
		let z = f, Ue = n(() => ce.value !== null), B = n(() => P.value !== null), We = n(() => ({
			currentPaginationNumber: W.value,
			maxPaginationNumber: G.value,
			isFirstPage: q.value,
			isLastPage: K.value,
			currentPageFirstIndex: pt.value,
			currentPageLastIndex: mt.value,
			totalItemsLength: U.value,
			rowsPerPage: H.value,
			rowsItems: tt.value,
			rowsPerPageMessage: _.rowsPerPageMessage,
			rowsOfPageSeparatorMessage: _.rowsOfPageSeparatorMessage,
			hideRowsPerPage: _.hideRowsPerPage,
			hidePaginationInfo: _.hidePaginationInfo,
			buttonsPagination: _.buttonsPagination,
			nextPage: J,
			prevPage: Y,
			updatePage: X,
			updateRowsPerPage: nt,
			items: Z.value,
			headers: V.value,
			selectedItems: at.value,
			multipleSelectStatus: ht.value,
			theme: _.theme
		})), Ge = n(() => ({
			hideFooter: !1,
			hideRowsPerPage: _.hideRowsPerPage,
			hidePaginationInfo: _.hidePaginationInfo,
			buttonsPagination: _.buttonsPagination,
			showShadow: wt.value,
			footerClassName: _.footerClassName,
			mobileFooterClasses: _.mobileFooterClasses,
			desktopFooterClasses: _.desktopFooterClasses,
			rowsPerPage: H.value,
			rowsItems: tt.value,
			rowsPerPageMessage: _.rowsPerPageMessage,
			rowsOfPageSeparatorMessage: _.rowsOfPageSeparatorMessage,
			currentPageFirstIndex: pt.value,
			currentPageLastIndex: mt.value,
			totalItemsLength: U.value,
			currentPaginationNumber: W.value,
			maxPaginationNumber: G.value,
			isFirstPage: q.value,
			isLastPage: K.value
		})), { serverOptionsComputed: Ke, updateServerOptionsPage: qe, updateServerOptionsSort: Je, updateServerOptionsRowsPerPage: Ye } = we(P, F, z), { clientSortOptions: Xe, headerColumns: Ze, headersForRender: V, updateSortField: Qe, isMultiSorting: $e, getMultiSortNumber: et } = he(ie, v, y, L, Ae, je, se, Le, re, Ue, B, De, Ke, be, Te, Ee, F, Pe, Je, z), { rowsItemsComputed: tt, rowsPerPageRef: H, updateRowsPerPage: nt } = Ce(B, j, P, ue), { totalItems: rt, selectItemsComputed: at, totalItemsLength: U, toggleSelectAll: st, toggleSelectItem: ct, isProcessing: lt, processProgress: ut } = Me(Xe, M, B, le, ce, ge, _e, ve, ye, F, Ne, _.disabledRows, z), { currentPaginationNumber: W, maxPaginationNumber: G, isLastPage: K, isFirstPage: q, nextPage: J, prevPage: Y, updatePage: X, updateCurrentPaginationNumber: ft } = Se(ae, B, N, U, H, P, qe), { currentPageFirstIndex: pt, currentPageLastIndex: mt, multipleSelectStatus: ht, pageItems: Z } = xe(W, Ue, B, le, H, at, be, rt, U, _.disabledRows), Q = n(() => W.value === 0 ? 0 : (W.value - 1) * H.value), { expandingItemIndexList: gt, updateExpandingItemIndexList: _t, clearExpandingItemIndexList: vt } = pe(Z, Q, z), { fixedHeaders: yt, leftFixedHeaders: $, rightFixedHeaders: bt, lastLeftFixedColumn: xt, firstRightFixedColumn: St, fixedColumnsInfos: Ct, showShadow: wt } = me(V, He), Tt = (e) => {
			let t = e.width ?? (yt.value.length ? 100 : null);
			if (t) return `width: ${t}px; min-width: ${t}px;`;
		}, Et = (e, t = "th") => {
			if (!yt.value.length) return;
			let n = Ct.value.find((t) => t.value === e);
			if (n) return `
            position: sticky;
            ${n.position === "left" ? `left: ${n.distance}px;` : `right: ${n.distance}px;`}
            z-index: ${t === "th" ? 3 : 1};
        `;
		}, Dt = n(() => (e) => {
			if (!yt.value.length) return [];
			let t = [];
			return Ct.value.find((t) => t.value === e) && (t.push("fixed-column"), e === xt.value ? t.push("fixed-left-shadow") : e === St.value && t.push("fixed-right-shadow")), t;
		}), kt = (e) => {
			e.sortable && e.sortType && Qe(e.value, e.sortType);
		}, At = (e) => typeof _.disabledRows == "function" ? _.disabledRows(e) : !1, jt = n(() => Z.value.every((e) => _.disabledRows(e))), Rt = (e) => {
			At(e) || ct(e);
		}, { handleRowClick: zt, handleRowDoubleClick: Bt, handleRowContextMenu: Vt } = fe(I, Ue, be, At, Oe, ke, _t, ct, z);
		return k(N, (e, t) => {
			Ke.value && e === !1 && t === !0 && (ft(Ke.value.page), vt());
		}), k(H, (e) => {
			B.value ? Ye(e) : X(1);
		}), k([_e, M], () => {
			B.value || X(1);
		}), k([
			W,
			Xe,
			ge,
			_e,
			M
		], () => {
			vt();
		}, { deep: !0 }), k(Z, (e) => {
			z("updatePageItems", e);
		}, { deep: !0 }), k(rt, (e) => {
			z("updateTotalItems", e);
		}, { deep: !0 }), u({
			currentPageFirstIndex: pt,
			currentPageLastIndex: mt,
			clientItemsLength: U,
			maxPaginationNumber: G,
			currentPaginationNumber: W,
			isLastPage: K,
			isFirstPage: q,
			nextPage: J,
			prevPage: Y,
			updatePage: X,
			rowsPerPageOptions: tt,
			rowsPerPageActiveOption: H,
			updateRowsPerPageActiveOption: nt
		}), (t, n) => (b(), a("div", p({
			ref_key: "tableWrapper",
			ref: Ve,
			class: ["vdt-table-wrapper relative w-full", [t.wrapperClassName]],
			style: D(Fe)
		}, D(Ie)), [
			o("div", {
				ref_key: "tableContainer",
				ref: He,
				class: m(["vdt-table-container relative overflow-auto border border-vdt-outline scroll-smooth min-h-[180px]", [{ "shadow-xs show-shadow": D(wt) }, t.containerClassName]])
			}, [
				o("table", {
					id: t.tableNodeId,
					class: m(["vdt-table w-full border-collapse bg-vdt-surface", [t.tableClassName]])
				}, [
					o("colgroup", null, [(b(!0), a(e, null, C(D(V), (e, t) => (b(), a("col", {
						key: t,
						style: g(Tt(e))
					}, null, 4))), 128))]),
					D(R)["customize-headers"] ? w(t.$slots, "customize-headers", { key: 0 }) : i("", !0),
					l(it, p({
						headers: D(V),
						hideHeader: t.hideHeader,
						fixedHeader: t.fixedHeader,
						headerClassName: t.headerClassName,
						borderCell: t.borderCell,
						lastLeftFixedColumn: D(xt),
						firstRightFixedColumn: D(St),
						headerItemClassName: t.headerItemClassName,
						areAllVisibleRowsDisabled: jt.value,
						multipleSelectStatus: D(ht),
						multiSort: D(F)
					}, {
						"is-multi-sorting": D($e),
						"get-multi-sort-number": D(et),
						"get-fixed-distance": Et,
						onHeaderClick: kt,
						onToggleSelectAll: D(st)
					}), s({ _: 2 }, [C(t.$slots, (e, n) => ({
						name: n,
						fn: A((e) => [w(t.$slots, n, h(d(e)))])
					}))]), 1040, [
						"is-multi-sorting",
						"get-multi-sort-number",
						"onToggleSelectAll"
					]),
					Re.value ? w(t.$slots, "body", h(p({ key: 1 }, D(Z)))) : D(Ze).length ? (b(), a("tbody", {
						key: 2,
						class: m(["vdt-tbody text-sm", [t.bodyClassName]])
					}, [
						w(t.$slots, "body-prepend", h(d({
							items: D(Z),
							pagination: {
								isFirstPage: D(q),
								isLastPage: D(K),
								currentPaginationNumber: D(W),
								maxPaginationNumber: D(G),
								nextPage: D(J),
								prevPage: D(Y)
							},
							headers: D(V)
						}))),
						(b(!0), a(e, null, C(D(Z), (n, o) => (b(), a(e, { key: n.key || o }, [l(ot, {
							item: n,
							index: o,
							columns: D(Ze),
							alternating: t.alternating,
							"no-hover": t.noHover,
							"border-cell": t.borderCell,
							"border-row": t.borderRow,
							"body-row-className": t.bodyRowClassName,
							"body-item-class-name": t.bodyItemClassName,
							"is-expanded": D(gt).includes(o + Q.value),
							"is-disabled": At(n),
							"expand-column": D(Pe),
							"get-fixed-distance": Et,
							"get-fixed-column-classes": Dt.value,
							onClick: (e) => D(zt)(e, n, o),
							onDblclick: (e) => D(Bt)(e, n, o),
							onContextmenu: (e) => D(Vt)(e, n),
							onToggleExpand: (e) => D(_t)(o, n, e),
							onToggleSelect: (e) => Rt(n)
						}, s({ _: 2 }, [C(t.$slots, (e, n) => ({
							name: n,
							fn: A((e) => [w(t.$slots, n, p({ ref_for: !0 }, e))])
						}))]), 1032, [
							"item",
							"index",
							"columns",
							"alternating",
							"no-hover",
							"border-cell",
							"border-row",
							"body-row-className",
							"body-item-class-name",
							"is-expanded",
							"is-disabled",
							"expand-column",
							"get-fixed-column-classes",
							"onClick",
							"onDblclick",
							"onContextmenu",
							"onToggleExpand",
							"onToggleSelect"
						]), Be.value || D(gt).includes(o + Q.value) ? (b(), r(dt, {
							key: 0,
							item: n,
							index: o,
							"columns-count": D(V).length,
							loading: n.expandLoading,
							"is-expanded": D(gt).includes(o + Q.value),
							"body-expand-row-className": t.bodyExpandRowClassName
						}, {
							default: A(() => [w(t.$slots, "expand", p({ ref_for: !0 }, n))]),
							_: 2
						}, 1032, [
							"item",
							"index",
							"columns-count",
							"loading",
							"is-expanded",
							"body-expand-row-className"
						])) : i("", !0)], 64))), 128)),
						w(t.$slots, "body-append", h(d({
							items: D(Z),
							pagination: {
								isFirstPage: D(q),
								isLastPage: D(K),
								currentPaginationNumber: D(W),
								maxPaginationNumber: D(G),
								nextPage: D(J),
								prevPage: D(Y),
								updatePage: D(X)
							},
							headers: D(V)
						})))
					], 2)) : i("", !0)
				], 10, Nt),
				D(N) ? (b(), a("div", Pt, [o("div", Ft, [w(t.$slots, "loading", {}, () => [l(oe)])])])) : i("", !0),
				!D(Z).length && !D(N) ? (b(), a("div", It, [w(t.$slots, "empty-message", {}, () => [c(T(t.emptyMessage), 1)])])) : i("", !0)
			], 2),
			t.hideFooter ? i("", !0) : (b(), a("div", Lt, [t.$slots["footer-content"] ? w(t.$slots, "footer-content", h(p({ key: 0 }, We.value))) : (b(), r(Ot, p({ key: 1 }, Ge.value, {
				"onUpdate:rowsPerPage": D(nt),
				onNextPage: D(J),
				onPrevPage: D(Y),
				onUpdatePage: D(X)
			}), s({ _: 2 }, [C(ze.value, (e, n) => ({
				name: n,
				fn: A((e) => [w(t.$slots, n, h(d(e)))])
			}))]), 1040, [
				"onUpdate:rowsPerPage",
				"onNextPage",
				"onPrevPage",
				"onUpdatePage"
			]))])),
			ne(l(de, { progress: D(ut) }, null, 8, ["progress"]), [[te, D(lt)]])
		], 16));
	}
}), zt = Rt, Bt = (e) => {
	e.component("DataTable", Rt);
};
Rt.install = Bt;
//#endregion
export { De as createFilter, zt as default, Bt as install };
