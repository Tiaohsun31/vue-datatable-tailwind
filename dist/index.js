var Ut = Object.defineProperty;
var Vt = (e, t, s) => t in e ? Ut(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var je = (e, t, s) => Vt(e, typeof t != "symbol" ? t + "" : t, s);
import { defineComponent as L, inject as we, openBlock as b, createElementBlock as w, Fragment as ie, renderList as Q, createElementVNode as C, normalizeClass as S, normalizeStyle as ue, unref as c, toDisplayString as U, ref as ee, computed as y, onMounted as yt, onUnmounted as Kt, watch as pe, createVNode as z, withModifiers as Ke, withDirectives as Ue, vShow as Ve, createBlock as V, useSlots as xt, renderSlot as I, normalizeProps as j, guardReactiveProps as oe, createCommentVNode as D, createSlots as ve, withCtx as Y, mergeProps as Z, createTextVNode as De, onBeforeUnmount as Gt, Transition as Jt, toRefs as Yt, provide as dt } from "vue";
const Zt = { class: "inline-flex relative w-[60px] h-[60px]" }, Qt = /* @__PURE__ */ L({
  __name: "Loading",
  setup(e) {
    const t = we("themeClasses");
    return (s, n) => (b(), w("div", Zt, [
      (b(), w(ie, null, Q(4, (l) => C("div", {
        key: l,
        class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(l - 1) * 150}`]]),
        style: ue({
          borderTopColor: c(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), he = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, l] of t)
    s[n] = l;
  return s;
}, Xt = /* @__PURE__ */ he(Qt, [["__scopeId", "data-v-e9a27991"]]), _t = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, ea = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, ta = { class: "w-64" }, aa = { class: "h-2 bg-gray-200 rounded" }, na = { class: "text-center text-sm text-gray-600" }, sa = /* @__PURE__ */ L({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = we("themeClasses");
    return (s, n) => (b(), w("div", _t, [
      C("div", ea, [
        n[0] || (n[0] = C("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        C("div", ta, [
          C("div", aa, [
            C("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: ue({ width: `${s.progress}%`, backgroundColor: c(t).hex })
            }, null, 4)
          ])
        ]),
        C("div", na, U(Math.round(s.progress)) + "% ", 1)
      ])
    ]));
  }
});
function ra(e, t, s, n, l, o, u, i, r) {
  const d = (v, m) => {
    const x = { ...v };
    return t.value && (delete x.checkbox, x.isSelected = v.checkbox), s.value && (delete x.index, x.indexInCurrentPage = m + 1), x;
  };
  return {
    handleRowClick: (v, m, x) => {
      if (!v.target.closest(".checkbox, .expand-button") && (l.value && u(x, m, v), o.value && !n(m) && i(m), e.value === "single")) {
        const $ = d(m, x);
        r("clickRow", $, v);
      }
    },
    handleRowDoubleClick: (v, m, x) => {
      if (e.value === "double") {
        const $ = d(m, x);
        r("clickRow", $, v);
      }
    },
    handleRowContextMenu: (v, m) => {
      const x = d(m, -1);
      r("contextmenuRow", x, v);
    }
  };
}
function la(e, t, s) {
  const n = ee([]);
  return {
    expandingItemIndexList: n,
    // 展開項的索引列表
    updateExpandingItemIndexList: (u, i, r) => {
      r.stopPropagation();
      const d = n.value.indexOf(u);
      if (d !== -1)
        n.value.splice(d, 1);
      else {
        const a = e.value.findIndex((f) => JSON.stringify(f) === JSON.stringify(i));
        s("expandRow", t.value + a, i), n.value.push(t.value + a);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      n.value = [];
    }
    // 清空展開列表的方法
  };
}
function oa(e, t) {
  const s = y(() => e.value.filter((a) => a.fixed)), n = y(() => s.value.filter((a) => !a.fixedPosition || a.fixedPosition === "left")), l = y(() => s.value.filter((a) => a.fixedPosition === "right")), o = y(() => n.value.length ? n.value[n.value.length - 1].value : ""), u = y(() => l.value.length ? l.value[0].value : ""), i = y(() => {
    if (!s.value.length) return [];
    const a = [];
    if (n.value.length) {
      const f = n.value.map((p) => p.width ?? 100);
      n.value.forEach((p, v) => {
        a.push({
          value: p.value,
          // 列標籤
          fixed: !0,
          // 是否固定
          position: "left",
          // 固定位置
          width: p.width ?? 100,
          // 列寬度
          // 計算距離左側的距離
          distance: v === 0 ? 0 : f.reduce((m, x, $) => $ < v ? m + x : m, 0)
        });
      });
    }
    if (l.value.length) {
      const f = l.value.map((p) => p.width ?? 100);
      l.value.forEach((p, v) => {
        a.push({
          value: p.value,
          fixed: !0,
          position: "right",
          width: p.width ?? 100,
          distance: v === l.value.length - 1 ? 0 : f.reduce((m, x, $) => $ > v ? m + x : m, 0)
        });
      });
    }
    return a;
  }), r = ee(!1);
  let d = null;
  return yt(() => {
    const a = t.value;
    if (a) {
      const f = () => {
        r.value = a.scrollLeft > 0;
      };
      f(), a.addEventListener("scroll", f), d = () => {
        a.removeEventListener("scroll", f);
      };
    }
  }), Kt(() => {
    d && (d(), d = null);
  }), {
    fixedHeaders: s,
    leftFixedHeaders: n,
    rightFixedHeaders: l,
    lastLeftFixedColumn: o,
    firstRightFixedColumn: u,
    fixedColumnsInfos: i,
    showShadow: r
  };
}
function ia(e, t, s, n, l, o, u, i, r, d, a, f, p, v, m, x, $, N, O, T) {
  const te = y(() => u.value.length ? {
    hasFixedColumns: u.value.some((F) => F.fixed),
    fixedHeaders: u.value.filter((F) => F.fixed),
    unFixedHeaders: u.value.filter((F) => !F.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), q = ee(
    ua(m.value, x.value, $.value)
  ), ae = y(() => {
    const F = u.value.filter(
      (W) => W.fixed && (!W.fixedPosition || W.fixedPosition === "left")
    ), H = u.value.filter((W) => !W.fixed), E = u.value.filter(
      (W) => W.fixed && W.fixedPosition === "right"
    );
    return [
      ...Object.values(de.value).filter(Boolean),
      ...F,
      ...H,
      ...E
    ];
  }), de = y(() => ({
    checkbox: d.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: n.value || te.value.hasFixedColumns,
      fixedPosition: "left",
      width: t.value ?? 36
    },
    index: v.value && {
      text: e.value,
      value: "index",
      fixed: o.value || te.value.hasFixedColumns,
      fixedPosition: "left",
      width: r.value
    },
    expand: i.value && !N.value && {
      text: "",
      value: "expand",
      fixed: l.value || te.value.hasFixedColumns,
      fixedPosition: "left",
      width: s.value
    }
  })), Pe = y(
    () => ae.value.map((F) => F.value)
  ), Ce = (F, H) => {
    const E = H === "none" ? "asc" : H === "asc" ? "desc" : f.value ? "asc" : null;
    if (a.value) {
      O(F, E);
      return;
    }
    const G = $.value ? da(F, E, q.value) : ca(F, E);
    q.value = G, T("updateSort", { sortType: E, sortBy: F });
  }, ke = y(() => (F) => {
    var E, G;
    const H = a.value ? (E = p.value) == null ? void 0 : E.sortBy : (G = q.value) == null ? void 0 : G.sortBy;
    return Array.isArray(H) && H.includes(F);
  }), K = y(() => (F) => {
    var E, G;
    const H = a.value ? (E = p.value) == null ? void 0 : E.sortBy : (G = q.value) == null ? void 0 : G.sortBy;
    return Array.isArray(H) ? H.indexOf(F) + 1 : !1;
  });
  return {
    clientSortOptions: q,
    headerColumns: Pe,
    headersForRender: ae,
    updateSortField: Ce,
    isMultiSorting: ke,
    getMultiSortNumber: K
  };
}
function ua(e, t, s) {
  return s && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((n) => n === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const da = (e, t, s) => {
  if (!(s != null && s.sortBy) || !Array.isArray(s.sortBy) || !Array.isArray(s.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const n = s.sortBy.indexOf(e), l = [...s.sortBy], o = [...s.sortDesc];
  return n === -1 && t !== null ? (l.push(e), o.push(t === "desc")) : t === null ? (l.splice(n, 1), o.splice(n, 1)) : o[n] = t === "desc", { sortBy: l, sortDesc: o };
}, ca = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
class fa {
  constructor() {
    je(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    je(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let s = this.itemKeyCache.get(t);
    if (!s) {
      const { checkbox: n, index: l, ...o } = t;
      s = Object.entries(o).sort(([u], [i]) => u.localeCompare(i)).map(([u, i]) => `${u}:${i}`).join("|"), this.itemKeyCache.set(t, s);
    }
    return s;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ga(e, t, s, n, l, o, u, i, r, d) {
  const a = new fa(), f = y(
    () => (e.value - 1) * l.value + 1
  ), p = y(() => s.value ? Math.min(
    r.value,
    e.value * l.value
  ) : Math.min(
    i.value.length,
    e.value * l.value
  )), v = y(() => s.value ? n.value : i.value.slice(
    f.value - 1,
    p.value
  )), m = y(() => u.value ? v.value.map((N, O) => ({
    index: f.value + O,
    ...N
  })) : v.value), x = y(() => {
    if (o.value.length === 0)
      return "noneSelected";
    const N = d ? i.value.filter((T) => !d(T)) : i.value;
    return o.value.length === N.length && o.value.every(
      (te) => N.some(
        (q) => a.getItemKey(te) === a.getItemKey(q)
      )
    ) ? "allSelected" : "partSelected";
  }), $ = y(() => {
    if (!t.value)
      return m.value;
    switch (x.value) {
      case "allSelected":
        return m.value.map((N) => ({
          checkbox: !d || !d(N),
          // 考慮禁用狀態
          ...N
        }));
      case "noneSelected":
        return m.value.map((N) => ({
          checkbox: !1,
          ...N
        }));
      default:
        return m.value.map((N) => ({
          checkbox: o.value.some(
            (T) => a.getItemKey(N) === a.getItemKey(T)
          ) && (!d || !d(N)),
          ...N
        }));
    }
  });
  return {
    currentPageFirstIndex: f,
    currentPageLastIndex: p,
    multipleSelectStatus: x,
    pageItems: $
  };
}
function pa(e, t, s, n, l, o, u) {
  const i = ee(o.value ? o.value.page : e.value), r = y(() => Math.ceil(n.value / l.value)), d = y(() => r.value === 0 || i.value === r.value), a = y(() => i.value === 1);
  return {
    currentPaginationNumber: i,
    maxPaginationNumber: r,
    isLastPage: d,
    isFirstPage: a,
    nextPage: () => {
      if (n.value !== 0 && !d.value && !s.value)
        if (t.value) {
          const x = i.value + 1;
          u(x);
        } else
          i.value += 1;
    },
    prevPage: () => {
      if (n.value !== 0 && !a.value && !s.value)
        if (t.value) {
          const x = i.value - 1;
          u(x);
        } else
          i.value -= 1;
    },
    updatePage: (x) => {
      s.value || (t.value ? u(x) : i.value = x);
    },
    updateCurrentPaginationNumber: (x) => {
      i.value = x;
    }
  };
}
function ma(e, t, s, n) {
  var i;
  const l = y(() => !e.value && t.value.findIndex((r) => r === n.value) === -1 ? [n.value, ...t.value] : t.value), o = ee(((i = s.value) == null ? void 0 : i.rowsPerPage) ?? n.value);
  return {
    rowsItemsComputed: l,
    // 計算後的每頁行數選項
    rowsPerPageRef: o,
    // 每頁行數
    updateRowsPerPage: (r) => {
      o.value = r;
    }
    // 更新每頁行數
  };
}
function va(e, t, s) {
  const n = y({
    get: () => {
      if (e.value) {
        const { page: i, rowsPerPage: r, sortBy: d, sortType: a } = e.value;
        return { page: i, rowsPerPage: r, sortBy: d ?? null, sortType: a ?? null };
      }
      return null;
    },
    set: (i) => {
      s("update:serverOptions", i);
    }
  });
  return {
    serverOptionsComputed: n,
    updateServerOptionsPage: (i) => {
      n.value && (n.value = {
        ...n.value,
        page: i
      });
    },
    updateServerOptionsSort: (i, r) => {
      if (n.value)
        if (t.value && Array.isArray(n.value.sortBy) && Array.isArray(n.value.sortType)) {
          const d = n.value.sortBy.findIndex((a) => a === i);
          d === -1 && r !== null && (n.value.sortBy.push(i), n.value.sortType.push(r)), r === null ? (n.value.sortBy.splice(d, 1), n.value.sortType.splice(d, 1)) : n.value.sortType[d] = r;
        } else
          n.value = {
            ...n.value,
            sortBy: r !== null ? i : null,
            sortType: r
          };
    },
    updateServerOptionsRowsPerPage: (i) => {
      n.value && (n.value = {
        ...n.value,
        page: 1,
        rowsPerPage: i
      });
    }
  };
}
function ha(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function ba(e) {
  return e.comparison === "in";
}
function ya(e) {
  return typeof e.comparison == "function";
}
function xa(e) {
  return typeof e == "number" && !isNaN(e);
}
const Un = {
  number(e, t, s) {
    return { field: e, comparison: t, criteria: s };
  },
  string(e, t, s) {
    return { field: e, comparison: t, criteria: s };
  },
  array(e, t) {
    return { field: e, comparison: "in", criteria: t };
  },
  custom(e, t, s) {
    return { field: e, comparison: t, criteria: s };
  }
};
function _(e, t) {
  if (e.includes(".")) {
    const s = e.split(".");
    let n = t;
    for (const l of s)
      if (n && typeof n == "object")
        n = n[l];
      else
        return "";
    return n ?? "";
  }
  return t[e] ?? "";
}
function wa(e, t) {
  const s = _(e, t);
  return Array.isArray(s) ? s.join(",") : s;
}
const ct = 1e3, ft = /* @__PURE__ */ new WeakMap(), Te = (e) => {
  let t = ft.get(e);
  if (!t) {
    const { checkbox: s, index: n, ...l } = e;
    t = JSON.stringify(l), ft.set(e, t);
  }
  return t;
};
function Pa(e, t, s, n) {
  const l = ee({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  pe(t, (a) => {
    if (a === null) {
      l.value.selectedItems.clear(), l.value.itemsMap.clear();
      return;
    }
    const f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map();
    for (const v of a) {
      const m = Te(v);
      f.add(m), p.set(m, v);
    }
    l.value.selectedItems = f, l.value.itemsMap = p;
  }, { immediate: !0, deep: !0 });
  const o = async (a, f, p) => new Promise((v) => {
    requestAnimationFrame(() => {
      const m = new Set(l.value.selectedItems), x = new Map(l.value.itemsMap);
      for (let $ = 0; $ < a.length; $++) {
        const N = a[$], O = Te(N);
        f ? (m.add(O), x.set(O, N)) : m.delete(O), l.value.processedCount = p + $ + 1, l.value.visualProgress = l.value.processedCount / l.value.totalCount * 100;
      }
      l.value.selectedItems = m, l.value.itemsMap = x, v();
    });
  }), u = async (a) => {
    if (!l.value.selectionInProgress)
      try {
        if (l.value.selectionInProgress = !0, l.value.processedCount = 0, l.value.totalCount = e.value.length, l.value.visualProgress = 0, !a) {
          l.value.selectedItems.clear(), l.value.itemsMap.clear(), n("update:itemsSelected", []), l.value.visualProgress = 100;
          return;
        }
        const f = e.value;
        for (let p = 0; p < f.length; p += ct) {
          const m = f.slice(p, Math.min(p + ct, f.length)).filter((x) => !s(x));
          await o(m, a, p), await new Promise((x) => setTimeout(x, 0));
        }
        n("update:itemsSelected", r.value), a && n("selectAll");
      } finally {
        l.value.selectionInProgress = !1;
      }
  }, i = (a) => {
    const f = Te(a), p = { ...a };
    delete p.checkbox, delete p.index;
    const v = new Set(l.value.selectedItems), m = new Map(l.value.itemsMap);
    v.has(f) ? (v.delete(f), n("deselectRow", p)) : (v.add(f), m.set(f, p), n("selectRow", p)), l.value.selectedItems = v, l.value.itemsMap = m, n("update:itemsSelected", Array.from(m.values()).filter(($) => v.has(Te($))));
  }, r = y(() => l.value.selectedItems.size === 0 ? [] : Array.from(l.value.itemsMap.entries()).filter(([a]) => l.value.selectedItems.has(a)).map(([, a]) => a)), d = y(() => l.value.visualProgress);
  return {
    selectedItems: r,
    toggleSelectAll: u,
    toggleSelectItem: i,
    isProcessing: y(() => l.value.selectionInProgress),
    selectionProgress: d
  };
}
function Ca(e, t, s, n, l, o, u, i, r, d, a, f) {
  const p = /* @__PURE__ */ new WeakMap(), v = (h) => {
    let k = p.get(h);
    return k || (typeof o.value == "string" && o.value !== "" ? k = String(_(o.value, h)) : Array.isArray(o.value) ? k = o.value.map((P) => String(_(P, h))).join(" ") : k = Object.values(h).map(String).join(" "), p.set(h, k)), k;
  }, m = y(() => {
    if (!s.value && u.value !== "") {
      const h = new RegExp(u.value, "i");
      return n.value.filter((k) => h.test(v(k)));
    }
    return n.value;
  }), x = (h, k) => {
    const P = xa(h) ? h : parseFloat(String(h));
    if (isNaN(P)) return !1;
    if (k.comparison === "between" && Array.isArray(k.criteria)) {
      const [ce, ne] = k.criteria;
      return P >= ce && P <= ne;
    }
    const M = k.criteria;
    switch (k.comparison) {
      case ">":
        return P > M;
      case ">=":
        return P >= M;
      case "<":
        return P < M;
      case "<=":
        return P <= M;
      default:
        return !1;
    }
  }, $ = y(() => {
    var h;
    return (h = t.value) != null && h.length ? m.value.filter(
      (k) => t.value.every((P) => {
        const M = _(P.field, k);
        return ya(P) ? P.comparison(M, P.criteria) : ha(P) ? x(M, P) : ba(P) ? P.criteria.includes(M) : P.comparison === "=" ? M === P.criteria : M !== P.criteria;
      })
    ) : m.value;
  }), N = (h, k, P) => h === k ? 0 : h == null ? 1 : k == null ? -1 : h < k ? P ? 1 : -1 : P ? -1 : 1, O = (h, k, P, M) => M < 0 ? h : O(h, k, P, M - 1).sort((ce, ne) => {
    if (!k.slice(0, M).every((be) => _(be, ce) === _(be, ne))) return 0;
    const X = k[M], Ie = _(X, ce), se = _(X, ne);
    return N(Ie, se, P[M]);
  }), T = y(() => {
    if (s.value) return n.value;
    if (!e.value) return $.value;
    const { sortBy: h, sortDesc: k } = e.value, P = [...$.value];
    return r.value && Array.isArray(h) && Array.isArray(k) ? h.length ? O(P, h, k, h.length - 1) : P : P.sort((M, ce) => {
      const ne = _(h, M), Se = _(h, ce);
      return N(ne, Se, k);
    });
  }), te = y(() => s.value ? i.value : T.value.length), q = y(() => s.value ? !1 : (s.value ? i.value : n.value.length) >= d.value), {
    selectedItems: ae,
    toggleSelectAll: de,
    toggleSelectItem: Pe,
    isProcessing: Ce,
    selectionProgress: ke
  } = Pa(T, l, a, f), K = y({
    get: () => l.value ?? [],
    set: (h) => {
      f("update:itemsSelected", h);
    }
  }), F = (h) => h.filter((k) => !a(k)), H = (h) => {
    K.value = h ? F(T.value) : K.value = [], h && f("selectAll");
  }, E = (h) => {
    const k = h.checkbox;
    if (delete h.checkbox, delete h.index, k)
      K.value = K.value.filter(
        (P) => JSON.stringify(P) !== JSON.stringify(h)
      ), f("deselectRow", h);
    else {
      const P = K.value;
      P.unshift(h), K.value = P, f("selectRow", h);
    }
  };
  return {
    totalItems: T,
    selectItemsComputed: K,
    totalItemsLength: te,
    toggleSelectAll: (h) => {
      if (!T.value.every((P) => a(P)))
        if (q.value) {
          f("updateSelectionStatus", !0);
          try {
            de(h), f("update:itemsSelected", h ? Array.from(ae.value) : []), h && f("selectAll");
          } finally {
            f("updateSelectionStatus", !1);
          }
        } else
          H(h);
    },
    toggleSelectItem: (h) => {
      a(h) || (q.value ? Pe(h) : E(h));
    },
    isProcessing: y(() => q.value && Ce.value),
    processProgress: ke
  };
}
var qe = {}, ze = {}, Ee = { exports: {} }, gt;
function ka() {
  if (gt) return Ee.exports;
  gt = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Ee.exports = t(), Ee.exports.createColors = t, Ee.exports;
}
var pt;
function Sa() {
  return pt || (pt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(r, d) {
      for (var a in d) Object.defineProperty(r, a, {
        enumerable: !0,
        get: d[a]
      });
    }
    t(e, {
      dim: function() {
        return u;
      },
      default: function() {
        return i;
      }
    });
    const s = /* @__PURE__ */ n(/* @__PURE__ */ ka());
    function n(r) {
      return r && r.__esModule ? r : {
        default: r
      };
    }
    let l = /* @__PURE__ */ new Set();
    function o(r, d, a) {
      typeof process < "u" && process.env.JEST_WORKER_ID || a && l.has(a) || (a && l.add(a), console.warn(""), d.forEach((f) => console.warn(r, "-", f)));
    }
    function u(r) {
      return s.default.dim(r);
    }
    const i = {
      info(r, d) {
        o(s.default.bold(s.default.cyan("info")), ...Array.isArray(r) ? [
          r
        ] : [
          d,
          r
        ]);
      },
      warn(r, d) {
        o(s.default.bold(s.default.yellow("warn")), ...Array.isArray(r) ? [
          r
        ] : [
          d,
          r
        ]);
      },
      risk(r, d) {
        o(s.default.bold(s.default.magenta("risk")), ...Array.isArray(r) ? [
          r
        ] : [
          d,
          r
        ]);
      }
    };
  }(ze)), ze;
}
var mt;
function Ia() {
  return mt || (mt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const t = /* @__PURE__ */ s(Sa());
    function s(o) {
      return o && o.__esModule ? o : {
        default: o
      };
    }
    function n({ version: o, from: u, to: i }) {
      t.default.warn(`${u}-color-renamed`, [
        `As of Tailwind CSS ${o}, \`${u}\` has been renamed to \`${i}\`.`,
        "Update your configuration file to silence this warning."
      ]);
    }
    const l = {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617"
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712"
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b"
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a"
      },
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09"
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a"
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
        950: "#431407"
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03"
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
        950: "#422006"
      },
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
        950: "#1a2e05"
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
        950: "#052e16"
      },
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22"
      },
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
        950: "#042f2e"
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344"
      },
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49"
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554"
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
        950: "#1e1b4b"
      },
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
        950: "#2e1065"
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764"
      },
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
        950: "#4a044e"
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
        950: "#500724"
      },
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
        950: "#4c0519"
      },
      get lightBlue() {
        return n({
          version: "v2.2",
          from: "lightBlue",
          to: "sky"
        }), this.sky;
      },
      get warmGray() {
        return n({
          version: "v3.0",
          from: "warmGray",
          to: "stone"
        }), this.stone;
      },
      get trueGray() {
        return n({
          version: "v3.0",
          from: "trueGray",
          to: "neutral"
        }), this.neutral;
      },
      get coolGray() {
        return n({
          version: "v3.0",
          from: "coolGray",
          to: "gray"
        }), this.gray;
      },
      get blueGray() {
        return n({
          version: "v3.0",
          from: "blueGray",
          to: "slate"
        }), this.slate;
      }
    };
  }(qe)), qe;
}
var We, vt;
function $a() {
  if (vt) return We;
  vt = 1;
  let e = Ia();
  return We = (e.__esModule ? e : { default: e }).default, We;
}
var A = $a();
const le = {
  slate: A.slate,
  gray: A.gray,
  zinc: A.zinc,
  neutral: A.neutral,
  stone: A.stone,
  red: A.red,
  orange: A.orange,
  amber: A.amber,
  yellow: A.yellow,
  lime: A.lime,
  green: A.green,
  emerald: A.emerald,
  teal: A.teal,
  cyan: A.cyan,
  sky: A.sky,
  blue: A.blue,
  indigo: A.indigo,
  violet: A.violet,
  purple: A.purple,
  fuchsia: A.fuchsia,
  pink: A.pink,
  rose: A.rose
}, Ge = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, Na = (e) => {
  const t = ht(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let s = { color: "indigo", variant: "DEFAULT" }, n = 1 / 0;
  const l = Object.entries(le).reduce((o, [u, i]) => {
    if (typeof i == "object") {
      const r = u;
      Object.entries(Ge).forEach(([d, a]) => {
        i[a] && (o[i[a]] = { color: r, variant: d });
      });
    }
    return o;
  }, {});
  return Object.entries(l).forEach(([o, u]) => {
    const i = ht(o);
    if (!i) return;
    const r = Ra(t, i);
    r < n && (n = r, s = u);
  }), s;
}, Ba = (e, t) => {
  const s = Ge[t], n = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": le[e][s],
    "--theme-border": le[e][s],
    "--theme-hover": le[e][n],
    "--theme-active": le[e][t === "light" ? "500" : t === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": le.gray[300],
    "--theme-light": le[e]["400"],
    "--theme-focus": le[e][s] + "80"
    // 添加 50% 透明度
  };
}, Fa = (e) => {
  const { color: t, variant: s = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? Na(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : le[t][Ge[s]],
    tailwindName: t,
    style: Ba(t, s)
  };
};
function ht(e) {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}
function Ra(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const Aa = {}, Ma = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function La(e, t) {
  return b(), w("svg", Ma, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ta = /* @__PURE__ */ he(Aa, [["render", La]]), Ea = {}, Da = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Oa(e, t) {
  return b(), w("svg", Da, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Ha = /* @__PURE__ */ he(Ea, [["render", Oa]]), ja = {}, qa = { class: "px-3 py-1.5" };
function za(e, t) {
  return b(), w("span", qa, t[0] || (t[0] = [
    C("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      C("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const Wa = /* @__PURE__ */ he(ja, [["render", za]]), Ua = {}, Va = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ka(e, t) {
  return b(), w("svg", Va, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ga = /* @__PURE__ */ he(Ua, [["render", Ka]]), Ja = {}, Ya = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Za(e, t) {
  return b(), w("svg", Ya, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Qa = /* @__PURE__ */ he(Ja, [["render", Za]]), Xa = /* @__PURE__ */ L({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (t, s) => (b(), w("span", {
      key: t.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        t.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      z(Qa, {
        class: S({ "transform rotate-180": t.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), _a = ["checked", "disabled", "aria-checked"], en = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, tn = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, an = /* @__PURE__ */ L({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, s = y(() => t.checked), n = y(() => t.partial), l = we("themeClasses");
    return (o, u) => (b(), w("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !o.disabled && "cursor-pointer group",
        o.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: u[0] || (u[0] = Ke((i) => !o.disabled && o.$emit("change"), ["stop", "prevent"]))
    }, [
      C("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: s.value,
        disabled: o.disabled,
        "aria-checked": s.value
      }, null, 8, _a),
      C("div", {
        class: S(["h-4 w-4 rounded transition-all duration-200 border", [
          // Base states
          s.value && !n.value && [
            "bg-theme border-theme",
            !o.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          n.value && [
            "bg-theme border-theme",
            !o.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          !s.value && !n.value && [
            "border-gray-300 bg-white",
            !o.disabled && "group-hover:border-theme-light"
          ],
          // Focus states
          !o.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus"
        ]]),
        style: ue(c(l).style)
      }, [
        Ue((b(), w("svg", en, u[1] || (u[1] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ve, s.value && !n.value]
        ]),
        Ue((b(), w("svg", tn, u[2] || (u[2] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ve, n.value]
        ])
      ], 6)
    ], 2));
  }
}), wt = /* @__PURE__ */ L({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const s = t;
    return (n, l) => (b(), V(an, {
      checked: n.checked,
      disabled: n.disabled,
      partial: !1,
      onChange: l[0] || (l[0] = (o) => s("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), nn = /* @__PURE__ */ L({
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
    const s = e, n = y(() => s.status === "allSelected"), l = y(() => s.status === "partSelected"), o = t;
    return (u, i) => (b(), V(wt, {
      checked: n.value,
      partial: l.value,
      disabled: e.disabled,
      onChange: i[0] || (i[0] = (r) => o("change", !n.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), sn = {
  key: 1,
  class: "items-center gap-2"
}, rn = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, ln = /* @__PURE__ */ L({
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
    // lastFixedColumn: String,
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
    const s = t, n = xt(), l = (u) => [
      `header-${u.value}`,
      `header-${u.value.toLowerCase()}`,
      "header"
    ].find((r) => n[r]) || "header", o = (u) => {
      u.sortable && u.sortType && s("headerClick", u);
    };
    return (u, i) => (b(), w("th", {
      style: ue(e.fixedDistance),
      class: S(["vdt-thead-th px-4 py-3 font-semibold tracking-wider bg-gray-200 group", [
        "px-4 py-3 font-semibold tracking-wider group",
        {
          "cursor-pointer hover:bg-gray-300": e.header.sortable,
          "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.lastLeftFixedColumn,
          "shadow-[-1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.firstRightFixedColumn
        },
        e.header.sortable && {
          "bg-gray-200": e.header.sortType === "none",
          "bg-gray-300": e.header.sortType && ["desc", "asc"].includes(e.header.sortType)
        },
        typeof e.headerItemClassName == "string" ? e.headerItemClassName : e.headerItemClassName(e.header, e.index + 1)
      ]]),
      onClick: i[1] || (i[1] = Ke((r) => o(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (b(), V(nn, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: i[0] || (i[0] = (r) => u.$emit("toggleSelectAll", r))
      }, null, 8, ["disabled", "status"])) : (b(), w("div", sn, [
        I(u.$slots, l(e.header), j(oe({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          C("span", null, U(e.header.text), 1)
        ]),
        e.header.sortable ? (b(), V(c(Xa), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : D("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (b(), w("span", rn, U(e.getMultiSortNumber(e.header.value)), 1)) : D("", !0)
      ]))
    ], 6));
  }
}), on = /* @__PURE__ */ L({
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
  setup(e, { emit: t }) {
    const s = t, n = (o) => {
      s("headerClick", o);
    }, l = (o) => {
      s("toggleSelectAll", o);
    };
    return (o, u) => e.headers.length && !e.hideHeader ? (b(), w("thead", {
      key: 0,
      class: S(["vdt-thead", [
        "text-sm text-slate-700 uppercase text-nowrap text-left",
        { "sticky top-0 z-10": e.fixedHeader },
        e.headerClassName
      ]])
    }, [
      C("tr", {
        class: S(["vdt-thead-tr", [{ "divide-x divide-gray-200": e.borderCell }]])
      }, [
        (b(!0), w(ie, null, Q(e.headers, (i, r) => (b(), V(ln, {
          key: r,
          header: i,
          index: r,
          "fixed-distance": e.getFixedDistance(i.value),
          "last-left-fixed-column": e.lastLeftFixedColumn,
          "first-right-fixed-column": e.firstRightFixedColumn,
          "header-item-class-name": e.headerItemClassName,
          "are-all-visible-rows-disabled": e.areAllVisibleRowsDisabled,
          "multiple-select-status": e.multipleSelectStatus,
          "multi-sort": e.multiSort,
          "is-multi-sorting": e.isMultiSorting,
          "get-multi-sort-number": e.getMultiSortNumber,
          onHeaderClick: n,
          onToggleSelectAll: l
        }, ve({ _: 2 }, [
          Q(o.$slots, (d, a) => ({
            name: a,
            fn: Y((f) => [
              I(o.$slots, a, Z({ ref_for: !0 }, f))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-left-fixed-column", "first-right-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : D("", !0);
  }
}), un = /* @__PURE__ */ L({
  __name: "TableBodyCell",
  props: {
    column: {},
    item: {},
    index: {},
    style: {},
    isDisabled: { type: Boolean },
    expandColumn: {},
    isExpanded: { type: Boolean },
    bodyItemClassName: { type: [String, Function] }
  },
  emits: ["toggle-select", "toggle-expand"],
  setup(e, { emit: t }) {
    const s = e, n = t, l = y(() => s.isDisabled ?? !1), o = y(() => typeof s.bodyItemClassName == "function" ? s.bodyItemClassName(s.column, s.index) : s.bodyItemClassName), u = y(
      () => s.column === "expand" || s.column === s.expandColumn
    ), i = () => {
      u.value && s.expandColumn === "" && n("toggle-expand", event);
    }, r = (a) => {
      n("toggle-expand", a);
    }, d = () => {
      n("toggle-select");
    };
    return (a, f) => (b(), w("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": a.column === "expand" && a.expandColumn === "" },
        o.value
      ]]),
      style: ue(a.style),
      onClick: i
    }, [
      a.column === "checkbox" ? (b(), w(ie, { key: 0 }, [
        a.column === "checkbox" ? I(a.$slots, "selection-checkbox", j(Z({ key: 0 }, { item: a.item, index: a.index, isDisabled: l.value, toggleSelectItem: d })), () => [
          z(wt, {
            checked: !!a.item.checkbox,
            disabled: l.value,
            onChange: d
          }, null, 8, ["checked", "disabled"])
        ]) : D("", !0)
      ], 64)) : u.value ? I(a.$slots, "expand-button", j(Z({ key: 1 }, { item: a.item, expanded: a.isExpanded, toggle: r })), () => [
        C("button", {
          onClick: Ke(r, ["stop"]),
          class: "inline-flex items-center"
        }, [
          z(c(Ga), {
            class: S({ "transform rotate-90": a.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : I(a.$slots, `item-${a.column}`, j(Z({ key: 2 }, a.item)), () => [
        I(a.$slots, `item-${a.column.toLowerCase()}`, j(oe(a.item)), () => [
          I(a.$slots, "item", j(oe({ column: a.column, item: a.item })), () => [
            De(U(c(wa)(a.column, a.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), dn = /* @__PURE__ */ L({
  __name: "TableBodyRow",
  props: {
    item: {},
    index: {},
    columns: {},
    alternating: { type: Boolean },
    noHover: { type: Boolean },
    borderCell: { type: Boolean },
    bodyRowClassName: { type: [String, Function] },
    isExpanded: { type: Boolean },
    isDisabled: { type: Boolean },
    expandColumn: {},
    getFixedDistance: { type: Function },
    bodyItemClassName: { type: [String, Function] }
  },
  emits: ["click", "dblclick", "contextmenu", "toggle-expand", "toggle-select"],
  setup(e, { emit: t }) {
    const s = e, n = t, l = y(() => typeof s.bodyRowClassName == "function" ? s.bodyRowClassName(s.item, s.index) : s.bodyRowClassName), o = (r) => {
      n("click", r, s.item, s.index);
    }, u = (r) => {
      n("dblclick", r, s.item, s.index);
    }, i = (r) => {
      n("contextmenu", r, s.item);
    };
    return (r, d) => (b(), w("tr", {
      class: S(["vdt-tbody-tr transition-colors border-t", [
        { "bg-white": r.alternating && r.index % 2 === 0 },
        { "bg-gray-50": !r.alternating || r.index % 2 === 1 },
        { "hover:bg-gray-100": !r.noHover },
        { "divide-x divide-gray-200": r.borderCell },
        l.value
      ]]),
      onClick: o,
      onDblclick: u,
      onContextmenu: i
    }, [
      I(r.$slots, "prepend"),
      (b(!0), w(ie, null, Q(r.columns, (a, f) => {
        var p;
        return b(), V(un, {
          key: f,
          column: a,
          item: r.item,
          index: r.index,
          style: ue((p = r.getFixedDistance) == null ? void 0 : p.call(r, a, "td")),
          "is-disabled": r.isDisabled,
          "expand-column": r.expandColumn,
          "is-expanded": r.isExpanded,
          "body-item-class-name": r.bodyItemClassName,
          onToggleExpand: d[0] || (d[0] = (v) => r.$emit("toggle-expand", v, r.index, r.item)),
          onToggleSelect: d[1] || (d[1] = () => r.$emit("toggle-select", r.item))
        }, ve({ _: 2 }, [
          Q(r.$slots, (v, m) => ({
            name: m,
            fn: Y((x) => [
              I(r.$slots, m, Z({ ref_for: !0 }, x))
            ])
          }))
        ]), 1032, ["column", "item", "index", "style", "is-disabled", "expand-column", "is-expanded", "body-item-class-name"]);
      }), 128)),
      I(r.$slots, "append")
    ], 34));
  }
}), cn = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, fn = /* @__PURE__ */ L({
  __name: "LoadingLine",
  setup(e) {
    const t = we("themeClasses");
    return (s, n) => (b(), w("div", cn, [
      C("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: ue({ backgroundColor: c(t).hex })
      }, null, 4)
    ]));
  }
}), gn = /* @__PURE__ */ he(fn, [["__scopeId", "data-v-cbdc3562"]]), pn = ["colspan"], mn = { class: "overflow-hidden" }, vn = /* @__PURE__ */ L({
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
    const t = e, s = y(() => typeof t.bodyExpandRowClassName == "function" ? t.bodyExpandRowClassName(t.item, t.index) : t.bodyExpandRowClassName);
    return (n, l) => (b(), w("tr", {
      class: S(["vdt-expand-row border-0", [s.value, { "bg-gray-50": (n.index + 1) % 2 === 0, "border-t": n.isExpanded }]])
    }, [
      C("td", {
        colspan: n.columnsCount,
        class: "relative p-0"
      }, [
        n.loading ? (b(), V(gn, {
          key: 0,
          class: "mb-4"
        })) : D("", !0),
        C("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": n.isExpanded }]])
        }, [
          C("div", mn, [
            I(n.$slots, "default")
          ])
        ], 2)
      ], 8, pn)
    ], 2));
  }
}), hn = { class: "flex items-center gap-2 text-sm text-gray-700" }, bn = { class: "relative inline-block min-w-[70px]" }, yn = ["aria-expanded"], xn = { class: "block truncate" }, wn = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, Pn = ["aria-selected", "onClick"], Cn = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, kn = /* @__PURE__ */ L({
  __name: "RowsPerPageSelector",
  props: {
    modelValue: {
      type: Number,
      required: !0
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
  setup(e, { emit: t }) {
    const s = e, n = t, l = ee(!1), o = ee(!1), u = y({
      get: () => s.modelValue,
      set: (p) => n("update:modelValue", p)
    }), i = we("dataTable");
    pe(l, (p) => {
      if (p && (i != null && i.value)) {
        const v = window.innerHeight, m = i.value.getBoundingClientRect(), x = v - (m.height + m.top);
        o.value = x <= 100;
      }
    });
    const r = (p) => {
      u.value = p, l.value = !1;
    }, d = () => {
      l.value = !l.value;
    }, a = (p) => {
      p.target.closest(".relative") || (l.value = !1);
    }, f = (p) => {
      const v = p.relatedTarget;
      v != null && v.closest(".relative") || (l.value = !1);
    };
    return yt(() => {
      document.addEventListener("click", a);
    }), Gt(() => {
      document.removeEventListener("click", a);
    }), (p, v) => (b(), w("div", hn, [
      De(U(e.message) + " ", 1),
      C("div", bn, [
        C("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-sm border border-gray-300", [
            "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            l.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: d,
          "aria-haspopup": "listbox",
          "aria-expanded": l.value
        }, [
          C("span", xn, U(u.value), 1),
          C("span", wn, [
            (b(), w("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": l.value }]),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, v[0] || (v[0] = [
              C("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 10, yn),
        z(Jt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: Y(() => [
            l.value ? (b(), w("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": o.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: f
            }, [
              (b(!0), w(ie, null, Q(e.rowsItems, (m) => (b(), w("li", {
                key: m,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  m === u.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": m === u.value,
                onClick: (x) => r(m)
              }, [
                C("span", {
                  class: S(["block", { "font-medium": m === u.value }])
                }, U(m), 3),
                m === u.value ? (b(), w("span", Cn, v[1] || (v[1] = [
                  C("svg", {
                    class: "h-4 w-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor"
                  }, [
                    C("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ], -1)
                ]))) : D("", !0)
              ], 10, Pn))), 128))
            ], 34)) : D("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Sn = { class: "text-sm text-gray-700" }, In = /* @__PURE__ */ L({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (t, s) => (b(), w("div", Sn, [
      I(t.$slots, "default", {
        firstIndex: t.currentPageFirstIndex,
        lastIndex: t.currentPageLastIndex,
        total: t.totalItemsLength,
        separator: t.rowsOfPageSeparatorMessage
      }, () => [
        De(U(`${t.currentPageFirstIndex}–${t.currentPageLastIndex}`) + " " + U(t.rowsOfPageSeparatorMessage) + " " + U(t.totalItemsLength), 1)
      ])
    ]));
  }
}), $n = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Nn = ["disabled"], Bn = ["disabled"], bt = /* @__PURE__ */ L({
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
    const s = t;
    return (n, l) => (b(), w("div", $n, [
      C("button", {
        type: "button",
        class: S(["relative inline-flex items-center p-1.5 rounded-md border", [
          e.isFirstPage ? [
            "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed",
            "hover:bg-gray-50"
          ] : [
            "border-gray-300 bg-white text-gray-500",
            "hover:bg-gray-50 hover:text-gray-700"
          ]
        ]]),
        disabled: e.isFirstPage,
        onClick: l[0] || (l[0] = (o) => s("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        z(c(Ha), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Nn),
      I(n.$slots, "buttonsPagination"),
      C("button", {
        type: "button",
        class: S(["relative inline-flex items-center p-1.5 rounded-md border", [
          e.isLastPage ? [
            "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed",
            "hover:bg-gray-50"
          ] : [
            "border-gray-300 bg-white text-gray-500",
            "hover:bg-gray-50 hover:text-gray-700"
          ]
        ]]),
        disabled: e.isLastPage,
        onClick: l[1] || (l[1] = (o) => s("clickNextPage")),
        "aria-label": "Next page"
      }, [
        z(c(Ta), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Bn)
    ]));
  }
}), Fn = {
  class: "vdt-pagination inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Rn = ["onClick"], me = 7, An = /* @__PURE__ */ L({
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
  setup(e, { emit: t }) {
    const s = e, n = t, l = we("themeClasses"), o = (i) => {
      i.type === "button" && !i.active && n("updatePage", i.page);
    }, u = y(() => {
      const i = [], { maxPaginationNumber: r, currentPaginationNumber: d } = s;
      if (r <= me) {
        for (let a = 1; a <= r; a += 1)
          i.push({
            type: "button",
            page: a,
            active: a === d,
            activePrev: a + 1 === d
          });
        return i;
      }
      if ([1, 2, r, r - 1].includes(d))
        for (let a = 1; a <= me; a += 1)
          if (a <= 3)
            i.push({
              type: "button",
              page: a,
              active: a === d,
              activePrev: a + 1 === d
            });
          else if (a === 4)
            i.push({ type: "omission" });
          else {
            const f = r - (me - a);
            i.push({
              type: "button",
              page: f,
              active: f === d,
              activePrev: f + 1 === d
            });
          }
      else if ([3, 4].includes(d))
        for (let a = 1; a <= me; a += 1)
          a <= 5 ? i.push({
            type: "button",
            page: a,
            active: a === d,
            activePrev: a + 1 === d
          }) : a === 6 ? i.push({ type: "omission" }) : i.push({
            type: "button",
            page: r,
            active: r === d,
            activePrev: !1
          });
      else if ([r - 2, r - 3].includes(d))
        for (let a = 1; a <= me; a += 1)
          if (a === 1)
            i.push({
              type: "button",
              page: 1,
              active: d === 1,
              activePrev: !1
            });
          else if (a === 2)
            i.push({ type: "omission" });
          else {
            const f = r - (me - a);
            i.push({
              type: "button",
              page: f,
              active: f === d,
              activePrev: f + 1 === d
            });
          }
      else
        for (let a = 1; a <= me; a += 1)
          if (a === 1)
            i.push({
              type: "button",
              page: 1,
              active: d === 1,
              activePrev: !1
            });
          else if (a === 2 || a === 6)
            i.push({ type: "omission" });
          else if (a === 7)
            i.push({
              type: "button",
              page: r,
              active: r === d,
              activePrev: !1
            });
          else {
            const f = 4 - a, p = d - f;
            i.push({
              type: "button",
              page: p,
              active: p === d,
              activePrev: p + 1 === d
            });
          }
      return i;
    });
    return (i, r) => (b(), w("div", Fn, [
      (b(!0), w(ie, null, Q(u.value, (d, a) => (b(), w("div", {
        key: a,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          a === 0 && "rounded-l-md",
          // Last item styles
          a === u.value.length - 1 && "rounded-r-md",
          // Button specific styles
          d.type === "button" && [
            "border border-gray-300",
            // Active state
            d.active ? [
              "z-10",
              c(l).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${c(l).tailwindName}-500`,
              `focus:border-${c(l).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !d.active && "cursor-pointer",
            // Connect borders for middle buttons
            a !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          d.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            a !== 0 && "-ml-px"
          ]
        ]]),
        style: ue(c(l).style),
        onClick: (f) => o(d)
      }, [
        d.type === "button" ? (b(), w("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": d.active }])
        }, U(d.page), 3)) : (b(), V(c(Wa), { key: 1 }))
      ], 14, Rn))), 128))
    ]));
  }
}), Mn = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Ln = /* @__PURE__ */ L({
  __name: "TableFooter",
  props: {
    hideFooter: { type: Boolean },
    hideRowsPerPage: { type: Boolean },
    hidePaginationInfo: { type: Boolean },
    buttonsPagination: { type: Boolean },
    showShadow: { type: Boolean },
    footerClassName: {},
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
  emits: ["update:rowsPerPage", "nextPage", "prevPage", "updatePage"],
  setup(e, { emit: t }) {
    const s = e, n = t, l = y(() => ({
      isFirstPage: s.isFirstPage,
      isLastPage: s.isLastPage,
      currentPaginationNumber: s.currentPaginationNumber,
      maxPaginationNumber: s.maxPaginationNumber,
      nextPage: () => n("nextPage"),
      prevPage: () => n("prevPage"),
      updatePage: (o) => n("updatePage", o)
    }));
    return (o, u) => o.hideFooter ? D("", !0) : (b(), w("div", {
      key: 0,
      class: S(["flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0", [{ "shadow-sm": o.showShadow }, o.footerClassName]])
    }, [
      z(bt, {
        "is-first-page": o.isFirstPage,
        "is-last-page": o.isLastPage,
        onClickNextPage: u[0] || (u[0] = () => n("nextPage")),
        onClickPrevPage: u[1] || (u[1] = () => n("prevPage")),
        class: "sm:hidden flex flex-1"
      }, {
        buttonsPagination: Y(() => u[6] || (u[6] = [
          C("div", { class: "grow" }, null, -1)
        ])),
        _: 1
      }, 8, ["is-first-page", "is-last-page"]),
      C("div", Mn, [
        o.hideRowsPerPage ? D("", !0) : (b(), V(kn, {
          key: 0,
          "model-value": o.rowsPerPage,
          "rows-items": o.rowsItems,
          message: o.rowsPerPageMessage,
          "onUpdate:modelValue": u[2] || (u[2] = (i) => n("update:rowsPerPage", i))
        }, null, 8, ["model-value", "rows-items", "message"])),
        o.hidePaginationInfo ? D("", !0) : (b(), V(In, {
          key: 1,
          "current-page-first-index": o.currentPageFirstIndex,
          "current-page-last-index": o.currentPageLastIndex,
          "total-items-length": o.totalItemsLength,
          "rows-of-page-separator-message": o.rowsOfPageSeparatorMessage
        }, ve({ _: 2 }, [
          o.$slots["pagination-info"] ? {
            name: "default",
            fn: Y((i) => [
              I(o.$slots, "pagination-info", j(oe(i)))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])),
        o.$slots.pagination ? I(o.$slots, "pagination", j(Z({ key: 2 }, l.value))) : (b(), V(bt, {
          key: 3,
          "is-first-page": o.isFirstPage,
          "is-last-page": o.isLastPage,
          onClickNextPage: u[4] || (u[4] = () => n("nextPage")),
          onClickPrevPage: u[5] || (u[5] = () => n("prevPage"))
        }, ve({ _: 2 }, [
          o.buttonsPagination ? {
            name: "buttonsPagination",
            fn: Y(() => [
              z(An, {
                "current-pagination-number": o.currentPaginationNumber,
                "max-pagination-number": o.maxPaginationNumber,
                onUpdatePage: u[3] || (u[3] = (i) => n("updatePage", i))
              }, null, 8, ["current-pagination-number", "max-pagination-number"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["is-first-page", "is-last-page"]))
      ])
    ], 2));
  }
}), Tn = ["id"], En = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Dn = { class: "relative z-10" }, On = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, Pt = /* @__PURE__ */ L({
  __name: "DataTable",
  props: {
    items: { default: () => [] },
    headers: { default: () => [] },
    currentPage: { default: 1 },
    rowsPerPage: { default: 25 },
    rowsItems: { default: () => [25, 50, 100] },
    hideFooter: { type: Boolean, default: !1 },
    hideRowsPerPage: { type: Boolean, default: !1 },
    rowsPerPageMessage: { default: "rows per page:" },
    rowsOfPageSeparatorMessage: { default: "of" },
    buttonsPagination: { type: Boolean, default: !0 },
    hidePaginationInfo: { type: Boolean },
    sortBy: { default: "" },
    sortType: { default: "asc" },
    multiSort: { type: Boolean, default: !1 },
    mustSort: { type: Boolean, default: !0 },
    filterOptions: { default: null },
    searchField: { default: "" },
    searchValue: { default: "" },
    serverOptions: { default: null },
    serverItemsLength: { default: 0 },
    theme: { default: () => ({ color: "indigo", variant: "DEFAULT" }) },
    alternating: { type: Boolean, default: !0 },
    noHover: { type: Boolean, default: !1 },
    borderCell: { type: Boolean, default: !1 },
    checkboxColumnWidth: { default: null },
    expandColumnWidth: { default: 36 },
    indexColumnWidth: { default: 60 },
    showIndex: { type: Boolean, default: !1 },
    showIndexSymbol: { default: "#" },
    fixedExpand: { type: Boolean, default: !1 },
    fixedHeader: { type: Boolean, default: !1 },
    fixedCheckbox: { type: Boolean, default: !1 },
    fixedIndex: { type: Boolean, default: !1 },
    wrapperClassName: { default: "" },
    containerClassName: { default: "" },
    tableClassName: { default: "" },
    headerClassName: { default: "" },
    bodyClassName: { default: "" },
    headerItemClassName: { type: [Function, String], default: "" },
    bodyRowClassName: { type: [Function, String], default: "" },
    bodyExpandRowClassName: { type: [Function, String], default: "" },
    bodyItemClassName: { type: [Function, String], default: "" },
    footerClassName: { default: "" },
    hideHeader: { type: Boolean, default: !1 },
    itemsSelected: { default: null },
    clickRowToSelect: { type: Boolean, default: !1 },
    disabledRows: { type: Function, default: () => !1 },
    loading: { type: Boolean, default: !1 },
    emptyMessage: { default: "No Available Data" },
    clickEventType: { default: "single" },
    clickRowToExpand: { type: Boolean, default: !1 },
    tableNodeId: { default: "" },
    preventContextMenuRow: { type: Boolean, default: !1 },
    expandColumn: { default: "" },
    expandTransition: { type: Boolean, default: void 0 },
    batchSelectionThreshold: { default: 1e4 }
  },
  emits: [
    "clickRow",
    "contextmenuRow",
    "selectRow",
    "deselectRow",
    "expandRow",
    "updateSort",
    "updateFilter",
    "update:itemsSelected",
    "update:serverOptions",
    "updatePageItems",
    "updateTotalItems",
    "selectAll",
    "updateSelectionStatus"
  ],
  setup(e, { expose: t, emit: s }) {
    const n = e, {
      checkboxColumnWidth: l,
      expandColumnWidth: o,
      indexColumnWidth: u,
      rowsItems: i,
      showIndexSymbol: r,
      currentPage: d,
      filterOptions: a,
      headers: f,
      itemsSelected: p,
      loading: v,
      items: m,
      rowsPerPage: x,
      searchField: $,
      searchValue: N,
      serverItemsLength: O,
      showIndex: T,
      sortBy: te,
      sortType: q,
      serverOptions: ae,
      multiSort: de,
      mustSort: Pe,
      clickEventType: Ce,
      clickRowToExpand: ke,
      clickRowToSelect: K,
      fixedExpand: F,
      fixedCheckbox: H,
      fixedIndex: E,
      batchSelectionThreshold: G,
      expandColumn: W
    } = Yt(n), h = y(() => Fa(n.theme));
    dt("themeClasses", h);
    const k = xt(), P = y(() => !!k.expand), M = y(() => !!k.body), ce = y(
      () => typeof n.expandTransition < "u" ? n.expandTransition : P.value
    ), ne = ee(null), Se = ee(null);
    dt("dataTable", ne);
    const X = s, Ie = y(() => p.value !== null), se = y(() => ae.value !== null), {
      serverOptionsComputed: be,
      updateServerOptionsPage: Ct,
      updateServerOptionsSort: kt,
      updateServerOptionsRowsPerPage: St
    } = va(
      ae,
      de,
      X
    ), {
      clientSortOptions: Je,
      headerColumns: Ye,
      headersForRender: ye,
      updateSortField: It,
      isMultiSorting: $t,
      getMultiSortNumber: Nt
    } = ia(
      r,
      l,
      o,
      H,
      F,
      E,
      f,
      P,
      u,
      Ie,
      se,
      Pe,
      be,
      T,
      te,
      q,
      de,
      W,
      kt,
      X
    ), {
      rowsItemsComputed: Ze,
      rowsPerPageRef: xe,
      updateRowsPerPage: Qe
    } = ma(
      se,
      i,
      ae,
      x
    ), {
      totalItems: Xe,
      selectItemsComputed: Bt,
      totalItemsLength: Ne,
      toggleSelectAll: Ft,
      toggleSelectItem: _e,
      isProcessing: Rt,
      processProgress: At
    } = Ca(
      Je,
      a,
      se,
      m,
      p,
      $,
      N,
      O,
      de,
      G,
      n.disabledRows,
      X
    ), {
      currentPaginationNumber: fe,
      maxPaginationNumber: Be,
      isLastPage: Fe,
      isFirstPage: Re,
      nextPage: Ae,
      prevPage: Me,
      updatePage: $e,
      updateCurrentPaginationNumber: Mt
    } = pa(
      d,
      se,
      v,
      Ne,
      xe,
      ae,
      Ct
    ), {
      currentPageFirstIndex: et,
      currentPageLastIndex: tt,
      multipleSelectStatus: Lt,
      pageItems: ge
    } = ga(
      fe,
      Ie,
      se,
      m,
      xe,
      Bt,
      T,
      Xe,
      Ne,
      n.disabledRows
    ), Le = y(() => fe.value === 0 ? 0 : (fe.value - 1) * xe.value), {
      expandingItemIndexList: Oe,
      updateExpandingItemIndexList: at,
      clearExpandingItemIndexList: nt
    } = la(
      ge,
      Le,
      X
    ), {
      fixedHeaders: st,
      leftFixedHeaders: jn,
      rightFixedHeaders: qn,
      lastLeftFixedColumn: rt,
      firstRightFixedColumn: lt,
      fixedColumnsInfos: Tt,
      showShadow: ot
    } = oa(
      ye,
      Se
    ), Et = (g) => {
      const re = g.width ?? (st.value.length ? 100 : null);
      if (re) return `width: ${re}px; min-width: ${re}px;`;
    }, it = (g, re = "th") => {
      if (!st.value.length) return;
      const B = Tt.value.find((R) => R.value === g);
      if (B) {
        const R = B.position === "left";
        return `
            ${R ? `left: ${B.distance}px;` : `right: ${B.distance}px;`}
            z-index: ${re === "th" ? 3 : 1};
            position: sticky;
            background-color: ${re === "th" ? "none" : "inherit"};
            ${R && B.value === rt.value || !R && B.value === lt.value ? `
                    box-shadow: ${R ? "4px 0 6px -2px" : "-4px 0 6px -2px"} rgba(0, 0, 0, 0.1);
                    clip-path: inset(0px ${R ? "-10px 0px 0px" : "0px 0px -10px"});
                ` : ""}
            isolation: isolate;
        `;
      }
    }, Dt = (g) => {
      g.sortable && g.sortType && It(g.value, g.sortType);
    }, He = (g) => typeof n.disabledRows == "function" ? n.disabledRows(g) : !1, Ot = y(() => ge.value.every((g) => n.disabledRows(g))), Ht = (g) => {
      He(g) || _e(g);
    }, {
      handleRowClick: jt,
      handleRowDoubleClick: qt,
      handleRowContextMenu: zt
    } = ra(
      Ce,
      Ie,
      T,
      He,
      ke,
      K,
      at,
      _e,
      X
    );
    return pe(v, (g, re) => {
      be.value && g === !1 && re === !0 && (Mt(be.value.page), nt());
    }), pe(xe, (g) => {
      se.value ? St(g) : $e(1);
    }), pe([N, a], () => {
      se.value || $e(1);
    }), pe([fe, Je, $, N, a], () => {
      nt();
    }, { deep: !0 }), pe(ge, (g) => {
      X("updatePageItems", g);
    }, { deep: !0 }), pe(Xe, (g) => {
      X("updateTotalItems", g);
    }, { deep: !0 }), t({
      currentPageFirstIndex: et,
      currentPageLastIndex: tt,
      clientItemsLength: Ne,
      maxPaginationNumber: Be,
      currentPaginationNumber: fe,
      isLastPage: Fe,
      isFirstPage: Re,
      nextPage: Ae,
      prevPage: Me,
      updatePage: $e,
      rowsPerPageOptions: Ze,
      rowsPerPageActiveOption: xe,
      updateRowsPerPageActiveOption: Qe
    }), (g, re) => (b(), w("div", {
      ref_key: "tableWrapper",
      ref: ne,
      class: S(["vdt-table-wrapper relative w-full", [g.wrapperClassName]])
    }, [
      C("div", {
        ref_key: "tableContainer",
        ref: Se,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "shadow-sm": c(ot) }, g.containerClassName]])
      }, [
        C("table", {
          id: g.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [g.tableClassName]])
        }, [
          C("colgroup", null, [
            (b(!0), w(ie, null, Q(c(ye), (B, R) => (b(), w("col", {
              key: R,
              style: ue(Et(B))
            }, null, 4))), 128))
          ]),
          c(k)["customize-headers"] ? I(g.$slots, "customize-headers", { key: 0 }) : D("", !0),
          z(on, Z({
            headers: c(ye),
            hideHeader: g.hideHeader,
            fixedHeader: g.fixedHeader,
            headerClassName: g.headerClassName,
            borderCell: g.borderCell,
            lastLeftFixedColumn: c(rt),
            firstRightFixedColumn: c(lt),
            headerItemClassName: g.headerItemClassName,
            areAllVisibleRowsDisabled: Ot.value,
            multipleSelectStatus: c(Lt),
            multiSort: c(de)
          }, {
            "is-multi-sorting": c($t),
            "get-multi-sort-number": c(Nt),
            "get-fixed-distance": it,
            onHeaderClick: Dt,
            onToggleSelectAll: c(Ft)
          }), ve({ _: 2 }, [
            Q(g.$slots, (B, R) => ({
              name: R,
              fn: Y((J) => [
                I(g.$slots, R, j(oe(J)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          M.value ? I(g.$slots, "body", j(Z({ key: 1 }, c(ge)))) : c(Ye).length ? (b(), w("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [g.bodyClassName]])
          }, [
            I(g.$slots, "body-prepend", j(oe({
              items: c(ge),
              pagination: { isFirstPage: c(Re), isLastPage: c(Fe), currentPaginationNumber: c(fe), maxPaginationNumber: c(Be), nextPage: c(Ae), prevPage: c(Me) },
              headers: c(ye)
            }))),
            (b(!0), w(ie, null, Q(c(ge), (B, R) => (b(), w(ie, {
              key: B.key || R
            }, [
              z(dn, {
                item: B,
                index: R,
                columns: c(Ye),
                alternating: g.alternating,
                "no-hover": g.noHover,
                "border-cell": g.borderCell,
                "body-row-className": g.bodyRowClassName,
                "body-item-class-name": g.bodyItemClassName,
                "is-expanded": c(Oe).includes(R + Le.value),
                "is-disabled": He(B),
                "expand-column": c(W),
                "get-fixed-distance": it,
                onClick: (J) => c(jt)(J, B, R),
                onDblclick: (J) => c(qt)(J, B, R),
                onContextmenu: (J) => c(zt)(J, B),
                onToggleExpand: (J) => c(at)(R, B, J),
                onToggleSelect: (J) => Ht(B)
              }, ve({ _: 2 }, [
                Q(g.$slots, (J, ut) => ({
                  name: ut,
                  fn: Y((Wt) => [
                    I(g.$slots, ut, Z({ ref_for: !0 }, Wt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "body-row-className", "body-item-class-name", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              ce.value || c(Oe).includes(R + Le.value) ? (b(), V(vn, {
                key: 0,
                item: B,
                index: R,
                "columns-count": c(ye).length,
                loading: B.expandLoading,
                "is-expanded": c(Oe).includes(R + Le.value),
                "body-expand-row-className": g.bodyExpandRowClassName
              }, {
                default: Y(() => [
                  I(g.$slots, "expand", Z({ ref_for: !0 }, B))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : D("", !0)
            ], 64))), 128)),
            I(g.$slots, "body-append", j(oe({
              items: c(ge),
              pagination: { isFirstPage: c(Re), isLastPage: c(Fe), currentPaginationNumber: c(fe), maxPaginationNumber: c(Be), nextPage: c(Ae), prevPage: c(Me), updatePage: c($e) },
              headers: c(ye)
            })))
          ], 2)) : D("", !0)
        ], 10, Tn),
        c(v) ? (b(), w("div", En, [
          C("div", Dn, [
            I(g.$slots, "loading", {}, () => [
              z(Xt)
            ])
          ])
        ])) : D("", !0),
        !c(ge).length && !c(v) ? (b(), w("div", On, [
          I(g.$slots, "empty-message", {}, () => [
            De(U(g.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      z(Ln, Z({
        hideFooter: g.hideFooter,
        hideRowsPerPage: g.hideRowsPerPage,
        hidePaginationInfo: g.hidePaginationInfo,
        buttonsPagination: g.buttonsPagination,
        showShadow: c(ot),
        footerClassName: g.footerClassName,
        rowsPerPage: c(xe),
        rowsItems: c(Ze),
        rowsPerPageMessage: g.rowsPerPageMessage,
        rowsOfPageSeparatorMessage: g.rowsOfPageSeparatorMessage,
        currentPageFirstIndex: c(et),
        currentPageLastIndex: c(tt),
        totalItemsLength: c(Ne),
        currentPaginationNumber: c(fe),
        maxPaginationNumber: c(Be),
        isFirstPage: c(Re),
        isLastPage: c(Fe)
      }, {
        "onUpdate:rowsPerPage": c(Qe),
        onNextPage: c(Ae),
        onPrevPage: c(Me),
        onUpdatePage: c($e)
      }), ve({ _: 2 }, [
        g.$slots["pagination-info"] ? {
          name: "pagination-info",
          fn: Y((B) => [
            I(g.$slots, "pagination-info", j(oe(B)))
          ]),
          key: "0"
        } : void 0,
        g.$slots.pagination ? {
          name: "pagination",
          fn: Y((B) => [
            I(g.$slots, "pagination", j(oe(B)))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]),
      Ue(z(sa, { progress: c(At) }, null, 8, ["progress"]), [
        [Ve, c(Rt)]
      ])
    ], 2));
  }
}), Hn = (e) => {
  e.component("DataTable", Pt);
};
Pt.install = Hn;
export {
  Un as createFilter,
  Pt as default,
  Hn as install
};
