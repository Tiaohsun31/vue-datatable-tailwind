var Vt = Object.defineProperty;
var Kt = (e, t, a) => t in e ? Vt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var qe = (e, t, a) => Kt(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as M, inject as xe, createElementBlock as P, openBlock as b, Fragment as oe, renderList as Q, createElementVNode as k, normalizeStyle as ge, normalizeClass as S, unref as f, toDisplayString as V, ref as ee, computed as y, onMounted as xt, onUnmounted as Gt, watch as fe, createVNode as U, withModifiers as Ge, withDirectives as Ve, vShow as Ke, createBlock as K, useSlots as wt, renderSlot as $, createCommentVNode as D, normalizeProps as q, guardReactiveProps as le, createSlots as me, withCtx as Y, mergeProps as Z, createTextVNode as De, onBeforeUnmount as Jt, Transition as Yt, toRefs as Zt, provide as ct } from "vue";
const Qt = { class: "inline-flex relative w-[60px] h-[60px]" }, Xt = /* @__PURE__ */ M({
  __name: "Loading",
  setup(e) {
    const t = xe("themeClasses");
    return (a, n) => (b(), P("div", Qt, [
      (b(), P(oe, null, Q(4, (l) => k("div", {
        key: l,
        class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(l - 1) * 150}`]]),
        style: ge({
          borderTopColor: f(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), ve = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, l] of t)
    a[n] = l;
  return a;
}, _t = /* @__PURE__ */ ve(Xt, [["__scopeId", "data-v-e9a27991"]]), ea = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, ta = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, aa = { class: "w-64" }, na = { class: "h-2 bg-gray-200 rounded" }, sa = { class: "text-center text-sm text-gray-600" }, ra = /* @__PURE__ */ M({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = xe("themeClasses");
    return (a, n) => (b(), P("div", ea, [
      k("div", ta, [
        n[0] || (n[0] = k("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        k("div", aa, [
          k("div", na, [
            k("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: ge({ width: `${a.progress}%`, backgroundColor: f(t).hex })
            }, null, 4)
          ])
        ]),
        k("div", sa, V(Math.round(a.progress)) + "% ", 1)
      ])
    ]));
  }
});
function la(e, t, a, n, l, i, d, o, s) {
  const u = (c, v) => {
    const w = { ...c };
    return t.value && (delete w.checkbox, w.isSelected = c.checkbox), a.value && (delete w.index, w.indexInCurrentPage = v + 1), w;
  };
  return {
    handleRowClick: (c, v, w) => {
      if (!c.target.closest(".checkbox, .expand-button") && (l.value && d(w, v, c), i.value && !n(v) && o(v), e.value === "single")) {
        const I = u(v, w);
        s("clickRow", I, c);
      }
    },
    handleRowDoubleClick: (c, v, w) => {
      if (e.value === "double") {
        const I = u(v, w);
        s("clickRow", I, c);
      }
    },
    handleRowContextMenu: (c, v) => {
      const w = u(v, -1);
      s("contextmenuRow", w, c);
    }
  };
}
function oa(e, t, a) {
  const n = ee([]);
  return {
    expandingItemIndexList: n,
    // 展開項的索引列表
    updateExpandingItemIndexList: (d, o, s) => {
      s.stopPropagation();
      const u = n.value.indexOf(d);
      if (u !== -1)
        n.value.splice(u, 1);
      else {
        const r = e.value.findIndex((p) => JSON.stringify(p) === JSON.stringify(o));
        a("expandRow", t.value + r, o), n.value.push(t.value + r);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      n.value = [];
    }
    // 清空展開列表的方法
  };
}
function ia(e, t) {
  const a = y(() => e.value.filter((r) => r.fixed)), n = y(() => a.value.filter((r) => !r.fixedPosition || r.fixedPosition === "left")), l = y(() => a.value.filter((r) => r.fixedPosition === "right")), i = y(() => n.value.length ? n.value[n.value.length - 1].value : ""), d = y(() => l.value.length ? l.value[0].value : ""), o = y(() => {
    if (!a.value.length) return [];
    const r = [];
    if (n.value.length) {
      const p = n.value.map((m) => m.width ?? 100);
      n.value.forEach((m, c) => {
        r.push({
          value: m.value,
          // 列標籤
          fixed: !0,
          // 是否固定
          position: "left",
          // 固定位置
          width: m.width ?? 100,
          // 列寬度
          // 計算距離左側的距離
          distance: c === 0 ? 0 : p.reduce((v, w, I) => I < c ? v + w : v, 0)
        });
      });
    }
    if (l.value.length) {
      const p = l.value.map((m) => m.width ?? 100);
      l.value.forEach((m, c) => {
        r.push({
          value: m.value,
          fixed: !0,
          position: "right",
          width: m.width ?? 100,
          distance: c === l.value.length - 1 ? 0 : p.reduce((v, w, I) => I > c ? v + w : v, 0)
        });
      });
    }
    return r;
  }), s = ee(!1);
  let u = null;
  return xt(() => {
    const r = t.value;
    if (r) {
      const p = () => {
        s.value = r.scrollLeft > 0;
      };
      p(), r.addEventListener("scroll", p), u = () => {
        r.removeEventListener("scroll", p);
      };
    }
  }), Gt(() => {
    u && (u(), u = null);
  }), {
    fixedHeaders: a,
    leftFixedHeaders: n,
    rightFixedHeaders: l,
    lastLeftFixedColumn: i,
    firstRightFixedColumn: d,
    fixedColumnsInfos: o,
    showShadow: s
  };
}
function ua(e, t, a, n, l, i, d, o, s, u, r, p, m, c, v, w, I, N, H, T) {
  const te = y(() => d.value.length ? {
    hasFixedColumns: d.value.some((B) => B.fixed),
    fixedHeaders: d.value.filter((B) => B.fixed),
    unFixedHeaders: d.value.filter((B) => !B.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), O = ee(
    da(v.value, w.value, I.value)
  ), { determineHeaderSortState: ie } = ga(r, m, I, O), ae = y(() => {
    const B = d.value.map((x) => ({
      ...x,
      sortType: x.sortable ? ie(x.value) : void 0
    })), j = B.filter(
      (x) => x.fixed && (!x.fixedPosition || x.fixedPosition === "left")
    ), E = B.filter((x) => !x.fixed), z = B.filter(
      (x) => x.fixed && x.fixedPosition === "right"
    );
    return [
      ...Object.values(we.value).filter(Boolean),
      ...j,
      ...E,
      ...z
    ];
  }), we = y(() => ({
    checkbox: u.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: n.value || te.value.hasFixedColumns,
      fixedPosition: "left",
      width: t.value ?? 36
    },
    index: c.value && {
      text: e.value,
      value: "index",
      fixed: i.value || te.value.hasFixedColumns,
      fixedPosition: "left",
      width: s.value
    },
    expand: o.value && !N.value && {
      text: "",
      value: "expand",
      fixed: l.value || te.value.hasFixedColumns,
      fixedPosition: "left",
      width: a.value
    }
  })), Pe = y(
    () => ae.value.map((B) => B.value)
  ), Ce = (B, j) => {
    const E = j === "none" ? "asc" : j === "asc" ? "desc" : p.value ? "asc" : null;
    if (r.value) {
      H(B, E);
      return;
    }
    const z = I.value ? ca(B, E, O.value) : fa(B, E);
    O.value = z, T("updateSort", { sortType: E, sortBy: B });
  }, G = y(() => (B) => {
    var E, z;
    const j = r.value ? (E = m.value) == null ? void 0 : E.sortBy : (z = O.value) == null ? void 0 : z.sortBy;
    return Array.isArray(j) && j.includes(B);
  }), ke = y(() => (B) => {
    var E, z;
    const j = r.value ? (E = m.value) == null ? void 0 : E.sortBy : (z = O.value) == null ? void 0 : z.sortBy;
    return Array.isArray(j) ? j.indexOf(B) + 1 : !1;
  });
  return {
    clientSortOptions: O,
    headerColumns: Pe,
    headersForRender: ae,
    updateSortField: Ce,
    isMultiSorting: G,
    getMultiSortNumber: ke
  };
}
function da(e, t, a) {
  return a && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((n) => n === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const ca = (e, t, a) => {
  if (!(a != null && a.sortBy) || !Array.isArray(a.sortBy) || !Array.isArray(a.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const n = a.sortBy.indexOf(e), l = [...a.sortBy], i = [...a.sortDesc];
  return n === -1 && t !== null ? (l.push(e), i.push(t === "desc")) : t === null ? (l.splice(n, 1), i.splice(n, 1)) : i[n] = t === "desc", { sortBy: l, sortDesc: i };
}, fa = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function ga(e, t, a, n) {
  const l = (o) => !e.value || !t.value ? i(o) : d(o), i = (o) => {
    if (!n.value) return "none";
    const { sortBy: s, sortDesc: u } = n.value;
    if (a.value && Array.isArray(s) && Array.isArray(u)) {
      const r = s.indexOf(o);
      return r !== -1 ? u[r] ? "desc" : "asc" : "none";
    }
    return o === s ? u ? "desc" : "asc" : "none";
  }, d = (o) => {
    const { sortBy: s, sortType: u } = t.value;
    if (a.value && Array.isArray(s) && Array.isArray(u)) {
      const r = s.indexOf(o);
      return r !== -1 ? u[r] : "none";
    }
    return o === s && u ? u : "none";
  };
  return {
    determineHeaderSortState: l
  };
}
class pa {
  constructor() {
    qe(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    qe(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let a = this.itemKeyCache.get(t);
    if (!a) {
      const { checkbox: n, index: l, ...i } = t;
      a = Object.entries(i).sort(([d], [o]) => d.localeCompare(o)).map(([d, o]) => `${d}:${o}`).join("|"), this.itemKeyCache.set(t, a);
    }
    return a;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ma(e, t, a, n, l, i, d, o, s, u) {
  const r = new pa(), p = y(
    () => (e.value - 1) * l.value + 1
  ), m = y(() => a.value ? Math.min(
    s.value,
    e.value * l.value
  ) : Math.min(
    o.value.length,
    e.value * l.value
  )), c = y(() => a.value ? n.value : o.value.slice(
    p.value - 1,
    m.value
  )), v = y(() => d.value ? c.value.map((N, H) => ({
    index: p.value + H,
    ...N
  })) : c.value), w = y(() => {
    if (i.value.length === 0)
      return "noneSelected";
    const N = u ? o.value.filter((T) => !u(T)) : o.value;
    return i.value.length === N.length && i.value.every(
      (te) => N.some(
        (O) => r.getItemKey(te) === r.getItemKey(O)
      )
    ) ? "allSelected" : "partSelected";
  }), I = y(() => {
    if (!t.value)
      return v.value;
    switch (w.value) {
      case "allSelected":
        return v.value.map((N) => ({
          checkbox: !u || !u(N),
          // 考慮禁用狀態
          ...N
        }));
      case "noneSelected":
        return v.value.map((N) => ({
          checkbox: !1,
          ...N
        }));
      default:
        return v.value.map((N) => ({
          checkbox: i.value.some(
            (T) => r.getItemKey(N) === r.getItemKey(T)
          ) && (!u || !u(N)),
          ...N
        }));
    }
  });
  return {
    currentPageFirstIndex: p,
    currentPageLastIndex: m,
    multipleSelectStatus: w,
    pageItems: I
  };
}
function va(e, t, a, n, l, i, d) {
  const o = ee(i.value ? i.value.page : e.value), s = y(() => Math.ceil(n.value / l.value)), u = y(() => s.value === 0 || o.value === s.value), r = y(() => o.value === 1);
  return {
    currentPaginationNumber: o,
    maxPaginationNumber: s,
    isLastPage: u,
    isFirstPage: r,
    nextPage: () => {
      if (n.value !== 0 && !u.value && !a.value)
        if (t.value) {
          const w = o.value + 1;
          d(w);
        } else
          o.value += 1;
    },
    prevPage: () => {
      if (n.value !== 0 && !r.value && !a.value)
        if (t.value) {
          const w = o.value - 1;
          d(w);
        } else
          o.value -= 1;
    },
    updatePage: (w) => {
      a.value || (t.value ? d(w) : o.value = w);
    },
    updateCurrentPaginationNumber: (w) => {
      o.value = w;
    }
  };
}
function ha(e, t, a, n) {
  var o;
  const l = y(() => !e.value && t.value.findIndex((s) => s === n.value) === -1 ? [n.value, ...t.value] : t.value), i = ee(((o = a.value) == null ? void 0 : o.rowsPerPage) ?? n.value);
  return {
    rowsItemsComputed: l,
    // 計算後的每頁行數選項
    rowsPerPageRef: i,
    // 每頁行數
    updateRowsPerPage: (s) => {
      i.value = s;
    }
    // 更新每頁行數
  };
}
function ba(e, t, a) {
  const n = y({
    get: () => {
      if (e.value) {
        const { page: o, rowsPerPage: s, sortBy: u, sortType: r } = e.value;
        return { page: o, rowsPerPage: s, sortBy: u ?? null, sortType: r ?? null };
      }
      return null;
    },
    set: (o) => {
      a("update:serverOptions", o);
    }
  });
  return {
    serverOptionsComputed: n,
    updateServerOptionsPage: (o) => {
      n.value && (n.value = {
        ...n.value,
        page: o
      });
    },
    updateServerOptionsSort: (o, s) => {
      if (n.value)
        if (t.value && Array.isArray(n.value.sortBy) && Array.isArray(n.value.sortType)) {
          const u = n.value.sortBy.findIndex((r) => r === o);
          u === -1 && s !== null && (n.value.sortBy.push(o), n.value.sortType.push(s)), s === null ? (n.value.sortBy.splice(u, 1), n.value.sortType.splice(u, 1)) : n.value.sortType[u] = s;
        } else
          n.value = {
            ...n.value,
            sortBy: s !== null ? o : null,
            sortType: s
          };
    },
    updateServerOptionsRowsPerPage: (o) => {
      n.value && (n.value = {
        ...n.value,
        page: 1,
        rowsPerPage: o
      });
    }
  };
}
function ya(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function xa(e) {
  return e.comparison === "in";
}
function wa(e) {
  return typeof e.comparison == "function";
}
function Pa(e) {
  return typeof e == "number" && !isNaN(e);
}
const Un = {
  number(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  },
  string(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  },
  array(e, t) {
    return { field: e, comparison: "in", criteria: t };
  },
  custom(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  }
};
function _(e, t) {
  if (e.includes(".")) {
    const a = e.split(".");
    let n = t;
    for (const l of a)
      if (n && typeof n == "object")
        n = n[l];
      else
        return "";
    return n ?? "";
  }
  return t[e] ?? "";
}
function Ca(e, t) {
  const a = _(e, t);
  return Array.isArray(a) ? a.join(",") : a;
}
const ft = 1e3, gt = /* @__PURE__ */ new WeakMap(), Te = (e) => {
  let t = gt.get(e);
  if (!t) {
    const { checkbox: a, index: n, ...l } = e;
    t = JSON.stringify(l), gt.set(e, t);
  }
  return t;
};
function ka(e, t, a, n) {
  const l = ee({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  fe(t, (r) => {
    if (r === null) {
      l.value.selectedItems.clear(), l.value.itemsMap.clear();
      return;
    }
    const p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
    for (const c of r) {
      const v = Te(c);
      p.add(v), m.set(v, c);
    }
    l.value.selectedItems = p, l.value.itemsMap = m;
  }, { immediate: !0, deep: !0 });
  const i = async (r, p, m) => new Promise((c) => {
    requestAnimationFrame(() => {
      const v = new Set(l.value.selectedItems), w = new Map(l.value.itemsMap);
      for (let I = 0; I < r.length; I++) {
        const N = r[I], H = Te(N);
        p ? (v.add(H), w.set(H, N)) : v.delete(H), l.value.processedCount = m + I + 1, l.value.visualProgress = l.value.processedCount / l.value.totalCount * 100;
      }
      l.value.selectedItems = v, l.value.itemsMap = w, c();
    });
  }), d = async (r) => {
    if (!l.value.selectionInProgress)
      try {
        if (l.value.selectionInProgress = !0, l.value.processedCount = 0, l.value.totalCount = e.value.length, l.value.visualProgress = 0, !r) {
          l.value.selectedItems.clear(), l.value.itemsMap.clear(), n("update:itemsSelected", []), l.value.visualProgress = 100;
          return;
        }
        const p = e.value;
        for (let m = 0; m < p.length; m += ft) {
          const v = p.slice(m, Math.min(m + ft, p.length)).filter((w) => !a(w));
          await i(v, r, m), await new Promise((w) => setTimeout(w, 0));
        }
        n("update:itemsSelected", s.value), r && n("selectAll");
      } finally {
        l.value.selectionInProgress = !1;
      }
  }, o = (r) => {
    const p = Te(r), m = { ...r };
    delete m.checkbox, delete m.index;
    const c = new Set(l.value.selectedItems), v = new Map(l.value.itemsMap);
    c.has(p) ? (c.delete(p), n("deselectRow", m)) : (c.add(p), v.set(p, m), n("selectRow", m)), l.value.selectedItems = c, l.value.itemsMap = v, n("update:itemsSelected", Array.from(v.values()).filter((I) => c.has(Te(I))));
  }, s = y(() => l.value.selectedItems.size === 0 ? [] : Array.from(l.value.itemsMap.entries()).filter(([r]) => l.value.selectedItems.has(r)).map(([, r]) => r)), u = y(() => l.value.visualProgress);
  return {
    selectedItems: s,
    toggleSelectAll: d,
    toggleSelectItem: o,
    isProcessing: y(() => l.value.selectionInProgress),
    selectionProgress: u
  };
}
function Sa(e, t, a, n, l, i, d, o, s, u, r, p) {
  const m = /* @__PURE__ */ new WeakMap(), c = (h) => {
    let x = m.get(h);
    return x || (typeof i.value == "string" && i.value !== "" ? x = String(_(i.value, h)) : Array.isArray(i.value) ? x = i.value.map((C) => String(_(C, h))).join(" ") : x = Object.values(h).map(String).join(" "), m.set(h, x)), x;
  }, v = y(() => {
    if (!a.value && d.value !== "") {
      const h = new RegExp(d.value, "i");
      return n.value.filter((x) => h.test(c(x)));
    }
    return n.value;
  }), w = (h, x) => {
    const C = Pa(h) ? h : parseFloat(String(h));
    if (isNaN(C)) return !1;
    if (x.comparison === "between" && Array.isArray(x.criteria)) {
      const [ue, ne] = x.criteria;
      return C >= ue && C <= ne;
    }
    const A = x.criteria;
    switch (x.comparison) {
      case ">":
        return C > A;
      case ">=":
        return C >= A;
      case "<":
        return C < A;
      case "<=":
        return C <= A;
      default:
        return !1;
    }
  }, I = y(() => {
    var h;
    return (h = t.value) != null && h.length ? v.value.filter(
      (x) => t.value.every((C) => {
        const A = _(C.field, x);
        return wa(C) ? C.comparison(A, C.criteria) : ya(C) ? w(A, C) : xa(C) ? C.criteria.includes(A) : C.comparison === "=" ? A === C.criteria : A !== C.criteria;
      })
    ) : v.value;
  }), N = (h, x, C) => h === x ? 0 : h == null ? 1 : x == null ? -1 : h < x ? C ? 1 : -1 : C ? -1 : 1, H = (h, x, C, A) => A < 0 ? h : H(h, x, C, A - 1).sort((ue, ne) => {
    if (!x.slice(0, A).every((he) => _(he, ue) === _(he, ne))) return 0;
    const X = x[A], Ie = _(X, ue), se = _(X, ne);
    return N(Ie, se, C[A]);
  }), T = y(() => {
    if (a.value) return n.value;
    if (!e.value) return I.value;
    const { sortBy: h, sortDesc: x } = e.value, C = [...I.value];
    return s.value && Array.isArray(h) && Array.isArray(x) ? h.length ? H(C, h, x, h.length - 1) : C : C.sort((A, ue) => {
      const ne = _(h, A), Se = _(h, ue);
      return N(ne, Se, x);
    });
  }), te = y(() => a.value ? o.value : T.value.length), O = y(() => a.value ? !1 : (a.value ? o.value : n.value.length) >= u.value), {
    selectedItems: ie,
    toggleSelectAll: ae,
    toggleSelectItem: we,
    isProcessing: Pe,
    selectionProgress: Ce
  } = ka(T, l, r, p), G = y({
    get: () => l.value ?? [],
    set: (h) => {
      p("update:itemsSelected", h);
    }
  }), ke = (h) => h.filter((x) => !r(x)), B = (h) => {
    G.value = h ? ke(T.value) : G.value = [], h && p("selectAll");
  }, j = (h) => {
    const x = h.checkbox;
    if (delete h.checkbox, delete h.index, x)
      G.value = G.value.filter(
        (C) => JSON.stringify(C) !== JSON.stringify(h)
      ), p("deselectRow", h);
    else {
      const C = G.value;
      C.unshift(h), G.value = C, p("selectRow", h);
    }
  };
  return {
    totalItems: T,
    selectItemsComputed: G,
    totalItemsLength: te,
    toggleSelectAll: (h) => {
      if (!T.value.every((C) => r(C)))
        if (O.value) {
          p("updateSelectionStatus", !0);
          try {
            ae(h), p("update:itemsSelected", h ? Array.from(ie.value) : []), h && p("selectAll");
          } finally {
            p("updateSelectionStatus", !1);
          }
        } else
          B(h);
    },
    toggleSelectItem: (h) => {
      r(h) || (O.value ? we(h) : j(h));
    },
    isProcessing: y(() => O.value && Pe.value),
    processProgress: Ce
  };
}
var ze = {}, We = {}, Ee = { exports: {} }, pt;
function Ia() {
  if (pt) return Ee.exports;
  pt = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Ee.exports = t(), Ee.exports.createColors = t, Ee.exports;
}
var mt;
function $a() {
  return mt || (mt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(s, u) {
      for (var r in u) Object.defineProperty(s, r, {
        enumerable: !0,
        get: u[r]
      });
    }
    t(e, {
      dim: function() {
        return d;
      },
      default: function() {
        return o;
      }
    });
    const a = /* @__PURE__ */ n(/* @__PURE__ */ Ia());
    function n(s) {
      return s && s.__esModule ? s : {
        default: s
      };
    }
    let l = /* @__PURE__ */ new Set();
    function i(s, u, r) {
      typeof process < "u" && process.env.JEST_WORKER_ID || r && l.has(r) || (r && l.add(r), console.warn(""), u.forEach((p) => console.warn(s, "-", p)));
    }
    function d(s) {
      return a.default.dim(s);
    }
    const o = {
      info(s, u) {
        i(a.default.bold(a.default.cyan("info")), ...Array.isArray(s) ? [
          s
        ] : [
          u,
          s
        ]);
      },
      warn(s, u) {
        i(a.default.bold(a.default.yellow("warn")), ...Array.isArray(s) ? [
          s
        ] : [
          u,
          s
        ]);
      },
      risk(s, u) {
        i(a.default.bold(a.default.magenta("risk")), ...Array.isArray(s) ? [
          s
        ] : [
          u,
          s
        ]);
      }
    };
  }(We)), We;
}
var vt;
function Na() {
  return vt || (vt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const t = /* @__PURE__ */ a($a());
    function a(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    function n({ version: i, from: d, to: o }) {
      t.default.warn(`${d}-color-renamed`, [
        `As of Tailwind CSS ${i}, \`${d}\` has been renamed to \`${o}\`.`,
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
  }(ze)), ze;
}
var Ue, ht;
function Ba() {
  if (ht) return Ue;
  ht = 1;
  let e = Na();
  return Ue = (e.__esModule ? e : { default: e }).default, Ue;
}
var R = Ba();
const re = {
  slate: R.slate,
  gray: R.gray,
  zinc: R.zinc,
  neutral: R.neutral,
  stone: R.stone,
  red: R.red,
  orange: R.orange,
  amber: R.amber,
  yellow: R.yellow,
  lime: R.lime,
  green: R.green,
  emerald: R.emerald,
  teal: R.teal,
  cyan: R.cyan,
  sky: R.sky,
  blue: R.blue,
  indigo: R.indigo,
  violet: R.violet,
  purple: R.purple,
  fuchsia: R.fuchsia,
  pink: R.pink,
  rose: R.rose
}, Je = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, Fa = (e) => {
  const t = bt(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let a = { color: "indigo", variant: "DEFAULT" }, n = 1 / 0;
  const l = Object.entries(re).reduce((i, [d, o]) => {
    if (typeof o == "object") {
      const s = d;
      Object.entries(Je).forEach(([u, r]) => {
        o[r] && (i[o[r]] = { color: s, variant: u });
      });
    }
    return i;
  }, {});
  return Object.entries(l).forEach(([i, d]) => {
    const o = bt(i);
    if (!o) return;
    const s = La(t, o);
    s < n && (n = s, a = d);
  }), a;
}, Ra = (e, t) => {
  const a = Je[t], n = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": re[e][a],
    "--theme-border": re[e][a],
    "--theme-hover": re[e][n],
    "--theme-active": re[e][t === "light" ? "500" : t === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": re.gray[300],
    "--theme-light": re[e]["400"],
    "--theme-focus": re[e][a] + "80"
    // 添加 50% 透明度
  };
}, Aa = (e) => {
  const { color: t, variant: a = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? Fa(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : re[t][Je[a]],
    tailwindName: t,
    style: Ra(t, a)
  };
};
function bt(e) {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}
function La(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const Ma = {}, Ta = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Ea(e, t) {
  return b(), P("svg", Ta, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Da = /* @__PURE__ */ ve(Ma, [["render", Ea]]), Ha = {}, Oa = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function ja(e, t) {
  return b(), P("svg", Oa, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const qa = /* @__PURE__ */ ve(Ha, [["render", ja]]), za = {}, Wa = { class: "px-3 py-1.5" };
function Ua(e, t) {
  return b(), P("span", Wa, t[0] || (t[0] = [
    k("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      k("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const Va = /* @__PURE__ */ ve(za, [["render", Ua]]), Ka = {}, Ga = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ja(e, t) {
  return b(), P("svg", Ga, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ya = /* @__PURE__ */ ve(Ka, [["render", Ja]]), Za = {}, Qa = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Xa(e, t) {
  return b(), P("svg", Qa, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const _a = /* @__PURE__ */ ve(Za, [["render", Xa]]), en = /* @__PURE__ */ M({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (t, a) => (b(), P("span", {
      key: t.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        t.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      U(_a, {
        class: S({ "transform rotate-180": t.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), tn = ["checked", "disabled", "aria-checked"], an = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, nn = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, sn = /* @__PURE__ */ M({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, a = y(() => t.checked), n = y(() => t.partial), l = xe("themeClasses");
    return (i, d) => (b(), P("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !i.disabled && "cursor-pointer group",
        i.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: d[0] || (d[0] = Ge((o) => !i.disabled && i.$emit("change"), ["stop", "prevent"]))
    }, [
      k("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: a.value,
        disabled: i.disabled,
        "aria-checked": a.value
      }, null, 8, tn),
      k("div", {
        class: S(["h-4 w-4 rounded transition-all duration-200 border", [
          // Base states
          a.value && !n.value && [
            "bg-theme border-theme",
            !i.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          n.value && [
            "bg-theme border-theme",
            !i.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          !a.value && !n.value && [
            "border-gray-300 bg-white",
            !i.disabled && "group-hover:border-theme-light"
          ],
          // Focus states
          !i.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus"
        ]]),
        style: ge(f(l).style)
      }, [
        Ve((b(), P("svg", an, d[1] || (d[1] = [
          k("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ke, a.value && !n.value]
        ]),
        Ve((b(), P("svg", nn, d[2] || (d[2] = [
          k("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ke, n.value]
        ])
      ], 6)
    ], 2));
  }
}), Pt = /* @__PURE__ */ M({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (b(), K(sn, {
      checked: n.checked,
      disabled: n.disabled,
      partial: !1,
      onChange: l[0] || (l[0] = (i) => a("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), rn = /* @__PURE__ */ M({
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
    const a = e, n = y(() => a.status === "allSelected"), l = y(() => a.status === "partSelected"), i = t;
    return (d, o) => (b(), K(Pt, {
      checked: n.value,
      partial: l.value,
      disabled: e.disabled,
      onChange: o[0] || (o[0] = (s) => i("change", !n.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), ln = {
  key: 1,
  class: "items-center gap-2"
}, on = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, un = /* @__PURE__ */ M({
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
    const a = t, n = wt(), l = (d) => [
      `header-${d.value}`,
      `header-${d.value.toLowerCase()}`,
      "header"
    ].find((s) => n[s]) || "header", i = (d) => {
      d.sortable && d.sortType && a("headerClick", d);
    };
    return (d, o) => (b(), P("th", {
      style: ge(e.fixedDistance),
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
      onClick: o[1] || (o[1] = Ge((s) => i(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (b(), K(rn, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: o[0] || (o[0] = (s) => d.$emit("toggleSelectAll", s))
      }, null, 8, ["disabled", "status"])) : (b(), P("div", ln, [
        $(d.$slots, l(e.header), q(le({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          k("span", null, V(e.header.text), 1)
        ]),
        e.header.sortable ? (b(), K(f(en), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : D("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (b(), P("span", on, V(e.getMultiSortNumber(e.header.value)), 1)) : D("", !0)
      ]))
    ], 6));
  }
}), dn = /* @__PURE__ */ M({
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
    const a = t, n = (i) => {
      a("headerClick", i);
    }, l = (i) => {
      a("toggleSelectAll", i);
    };
    return (i, d) => e.headers.length && !e.hideHeader ? (b(), P("thead", {
      key: 0,
      class: S(["vdt-thead", [
        "text-sm text-slate-700 uppercase text-nowrap text-left",
        { "sticky top-0 z-10": e.fixedHeader },
        e.headerClassName
      ]])
    }, [
      k("tr", {
        class: S(["vdt-thead-tr", [{ "divide-x divide-gray-200": e.borderCell }]])
      }, [
        (b(!0), P(oe, null, Q(e.headers, (o, s) => (b(), K(un, {
          key: s,
          header: o,
          index: s,
          "fixed-distance": e.getFixedDistance(o.value),
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
        }, me({ _: 2 }, [
          Q(i.$slots, (u, r) => ({
            name: r,
            fn: Y((p) => [
              $(i.$slots, r, Z({ ref_for: !0 }, p))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-left-fixed-column", "first-right-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : D("", !0);
  }
}), cn = /* @__PURE__ */ M({
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
    const a = e, n = t, l = y(() => a.isDisabled ?? !1), i = y(() => typeof a.bodyItemClassName == "function" ? a.bodyItemClassName(a.column, a.index) : a.bodyItemClassName), d = y(
      () => a.column === "expand" || a.column === a.expandColumn
    ), o = y(() => {
      if (a.getFixedDistance)
        return a.getFixedDistance(a.column, "td");
    }), s = y(() => a.getFixedColumnClasses ? a.getFixedColumnClasses(a.column) || [] : []), u = y(() => {
      let c = a.style || "";
      return o.value && (c += o.value), s.value.length > 0 && (c += " background-color: inherit;"), c;
    }), r = () => {
      d.value && a.expandColumn === "" && n("toggle-expand", event);
    }, p = (c) => {
      n("toggle-expand", c);
    }, m = () => {
      n("toggle-select");
    };
    return (c, v) => (b(), P("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": c.column === "expand" && c.expandColumn === "" },
        ...s.value,
        i.value
      ]]),
      style: ge(u.value),
      onClick: r
    }, [
      c.column === "checkbox" ? (b(), P(oe, { key: 0 }, [
        c.column === "checkbox" ? $(c.$slots, "selection-checkbox", q(Z({ key: 0 }, { item: c.item, index: c.index, isDisabled: l.value, toggleSelectItem: m })), () => [
          U(Pt, {
            checked: !!c.item.checkbox,
            disabled: l.value,
            onChange: m
          }, null, 8, ["checked", "disabled"])
        ]) : D("", !0)
      ], 64)) : d.value ? $(c.$slots, "expand-button", q(Z({ key: 1 }, { item: c.item, expanded: c.isExpanded, toggle: p })), () => [
        k("button", {
          onClick: Ge(p, ["stop"]),
          class: "inline-flex items-center"
        }, [
          U(f(Ya), {
            class: S({ "transform rotate-90": c.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : $(c.$slots, `item-${c.column}`, q(Z({ key: 2 }, c.item)), () => [
        $(c.$slots, `item-${c.column.toLowerCase()}`, q(le(c.item)), () => [
          $(c.$slots, "item", q(le({ column: c.column, item: c.item })), () => [
            De(V(f(Ca)(c.column, c.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), fn = /* @__PURE__ */ M({
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
  emits: ["click", "dblclick", "contextmenu", "toggle-expand", "toggle-select"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = y(() => typeof a.bodyRowClassName == "function" ? a.bodyRowClassName(a.item, a.index) : a.bodyRowClassName), i = (s) => {
      n("click", s, a.item, a.index);
    }, d = (s) => {
      n("dblclick", s, a.item, a.index);
    }, o = (s) => {
      n("contextmenu", s, a.item);
    };
    return (s, u) => (b(), P("tr", {
      class: S(["vdt-tbody-tr transition-colors divide-y divide-gray-200", [
        { "bg-white": s.alternating && s.index % 2 === 0 },
        { "bg-gray-50": !s.alternating || s.index % 2 === 1 },
        { "hover:bg-gray-100": !s.noHover },
        { "divide-x divide-gray-200": s.borderCell },
        { "border-b border-gray-200 last:border-b-0": s.borderRow },
        l.value
      ]]),
      onClick: i,
      onDblclick: d,
      onContextmenu: o
    }, [
      $(s.$slots, "prepend"),
      (b(!0), P(oe, null, Q(s.columns, (r, p) => (b(), K(cn, {
        key: p,
        column: r,
        item: s.item,
        index: s.index,
        "get-fixed-distance": s.getFixedDistance,
        "get-fixed-column-classes": s.getFixedColumnClasses,
        "is-disabled": s.isDisabled,
        "expand-column": s.expandColumn,
        "is-expanded": s.isExpanded,
        "body-item-class-name": s.bodyItemClassName,
        onToggleExpand: u[0] || (u[0] = (m) => s.$emit("toggle-expand", m, s.index, s.item)),
        onToggleSelect: u[1] || (u[1] = () => s.$emit("toggle-select", s.item))
      }, me({ _: 2 }, [
        Q(s.$slots, (m, c) => ({
          name: c,
          fn: Y((v) => [
            $(s.$slots, c, Z({ ref_for: !0 }, v))
          ])
        }))
      ]), 1032, ["column", "item", "index", "get-fixed-distance", "get-fixed-column-classes", "is-disabled", "expand-column", "is-expanded", "body-item-class-name"]))), 128)),
      $(s.$slots, "append")
    ], 34));
  }
}), gn = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, pn = /* @__PURE__ */ M({
  __name: "LoadingLine",
  setup(e) {
    const t = xe("themeClasses");
    return (a, n) => (b(), P("div", gn, [
      k("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: ge({ backgroundColor: f(t).hex })
      }, null, 4)
    ]));
  }
}), mn = /* @__PURE__ */ ve(pn, [["__scopeId", "data-v-cbdc3562"]]), vn = ["colspan"], hn = { class: "overflow-hidden" }, bn = /* @__PURE__ */ M({
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
    const t = e, a = y(() => typeof t.bodyExpandRowClassName == "function" ? t.bodyExpandRowClassName(t.item, t.index) : t.bodyExpandRowClassName);
    return (n, l) => (b(), P("tr", {
      class: S(["vdt-expand-row border-0", [a.value, { "bg-gray-50": (n.index + 1) % 2 === 0, "border-t": n.isExpanded }]])
    }, [
      k("td", {
        colspan: n.columnsCount,
        class: "relative p-0"
      }, [
        n.loading ? (b(), K(mn, {
          key: 0,
          class: "mb-4"
        })) : D("", !0),
        k("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": n.isExpanded }]])
        }, [
          k("div", hn, [
            $(n.$slots, "default")
          ])
        ], 2)
      ], 8, vn)
    ], 2));
  }
}), yn = { class: "flex items-center gap-2 text-sm text-gray-700" }, xn = { class: "relative inline-block min-w-[70px]" }, wn = ["aria-expanded"], Pn = { class: "block truncate" }, Cn = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, kn = ["aria-selected", "onClick"], Sn = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, In = /* @__PURE__ */ M({
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
    const a = e, n = t, l = ee(!1), i = ee(!1), d = y({
      get: () => a.modelValue,
      set: (m) => n("update:modelValue", m)
    }), o = xe("dataTable");
    fe(l, (m) => {
      if (m && (o != null && o.value)) {
        const c = window.innerHeight, v = o.value.getBoundingClientRect(), w = c - (v.height + v.top);
        i.value = w <= 100;
      }
    });
    const s = (m) => {
      d.value = m, l.value = !1;
    }, u = () => {
      l.value = !l.value;
    }, r = (m) => {
      m.target.closest(".relative") || (l.value = !1);
    }, p = (m) => {
      const c = m.relatedTarget;
      c != null && c.closest(".relative") || (l.value = !1);
    };
    return xt(() => {
      document.addEventListener("click", r);
    }), Jt(() => {
      document.removeEventListener("click", r);
    }), (m, c) => (b(), P("div", yn, [
      De(V(e.message) + " ", 1),
      k("div", xn, [
        k("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-sm border border-gray-300", [
            "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            l.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: u,
          "aria-haspopup": "listbox",
          "aria-expanded": l.value
        }, [
          k("span", Pn, V(d.value), 1),
          k("span", Cn, [
            (b(), P("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": l.value }]),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, c[0] || (c[0] = [
              k("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 10, wn),
        U(Yt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: Y(() => [
            l.value ? (b(), P("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": i.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: p
            }, [
              (b(!0), P(oe, null, Q(e.rowsItems, (v) => (b(), P("li", {
                key: v,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  v === d.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": v === d.value,
                onClick: (w) => s(v)
              }, [
                k("span", {
                  class: S(["block", { "font-medium": v === d.value }])
                }, V(v), 3),
                v === d.value ? (b(), P("span", Sn, c[1] || (c[1] = [
                  k("svg", {
                    class: "h-4 w-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor"
                  }, [
                    k("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ], -1)
                ]))) : D("", !0)
              ], 10, kn))), 128))
            ], 34)) : D("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), $n = { class: "text-sm text-gray-700" }, Nn = /* @__PURE__ */ M({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (t, a) => (b(), P("div", $n, [
      $(t.$slots, "default", {
        firstIndex: t.currentPageFirstIndex,
        lastIndex: t.currentPageLastIndex,
        total: t.totalItemsLength,
        separator: t.rowsOfPageSeparatorMessage
      }, () => [
        De(V(`${t.currentPageFirstIndex}–${t.currentPageLastIndex}`) + " " + V(t.rowsOfPageSeparatorMessage) + " " + V(t.totalItemsLength), 1)
      ])
    ]));
  }
}), Bn = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Fn = ["disabled"], Rn = ["disabled"], yt = /* @__PURE__ */ M({
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
    const a = t;
    return (n, l) => (b(), P("div", Bn, [
      k("button", {
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
        onClick: l[0] || (l[0] = (i) => a("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        U(f(qa), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Fn),
      $(n.$slots, "buttonsPagination"),
      k("button", {
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
        onClick: l[1] || (l[1] = (i) => a("clickNextPage")),
        "aria-label": "Next page"
      }, [
        U(f(Da), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Rn)
    ]));
  }
}), An = {
  class: "vdt-pagination inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Ln = ["onClick"], pe = 7, Mn = /* @__PURE__ */ M({
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
    const a = e, n = t, l = xe("themeClasses"), i = (o) => {
      o.type === "button" && !o.active && n("updatePage", o.page);
    }, d = y(() => {
      const o = [], { maxPaginationNumber: s, currentPaginationNumber: u } = a;
      if (s <= pe) {
        for (let r = 1; r <= s; r += 1)
          o.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: r + 1 === u
          });
        return o;
      }
      if ([1, 2, s, s - 1].includes(u))
        for (let r = 1; r <= pe; r += 1)
          if (r <= 3)
            o.push({
              type: "button",
              page: r,
              active: r === u,
              activePrev: r + 1 === u
            });
          else if (r === 4)
            o.push({ type: "omission" });
          else {
            const p = s - (pe - r);
            o.push({
              type: "button",
              page: p,
              active: p === u,
              activePrev: p + 1 === u
            });
          }
      else if ([3, 4].includes(u))
        for (let r = 1; r <= pe; r += 1)
          r <= 5 ? o.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: r + 1 === u
          }) : r === 6 ? o.push({ type: "omission" }) : o.push({
            type: "button",
            page: s,
            active: s === u,
            activePrev: !1
          });
      else if ([s - 2, s - 3].includes(u))
        for (let r = 1; r <= pe; r += 1)
          if (r === 1)
            o.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (r === 2)
            o.push({ type: "omission" });
          else {
            const p = s - (pe - r);
            o.push({
              type: "button",
              page: p,
              active: p === u,
              activePrev: p + 1 === u
            });
          }
      else
        for (let r = 1; r <= pe; r += 1)
          if (r === 1)
            o.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (r === 2 || r === 6)
            o.push({ type: "omission" });
          else if (r === 7)
            o.push({
              type: "button",
              page: s,
              active: s === u,
              activePrev: !1
            });
          else {
            const p = 4 - r, m = u - p;
            o.push({
              type: "button",
              page: m,
              active: m === u,
              activePrev: m + 1 === u
            });
          }
      return o;
    });
    return (o, s) => (b(), P("div", An, [
      (b(!0), P(oe, null, Q(d.value, (u, r) => (b(), P("div", {
        key: r,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          r === 0 && "rounded-l-md",
          // Last item styles
          r === d.value.length - 1 && "rounded-r-md",
          // Button specific styles
          u.type === "button" && [
            "border border-gray-300",
            // Active state
            u.active ? [
              "z-10",
              f(l).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${f(l).tailwindName}-500`,
              `focus:border-${f(l).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !u.active && "cursor-pointer",
            // Connect borders for middle buttons
            r !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          u.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            r !== 0 && "-ml-px"
          ]
        ]]),
        style: ge(f(l).style),
        onClick: (p) => i(u)
      }, [
        u.type === "button" ? (b(), P("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": u.active }])
        }, V(u.page), 3)) : (b(), K(f(Va), { key: 1 }))
      ], 14, Ln))), 128))
    ]));
  }
}), Tn = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, En = /* @__PURE__ */ M({
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
    const a = e, n = t, l = y(() => ({
      isFirstPage: a.isFirstPage,
      isLastPage: a.isLastPage,
      currentPaginationNumber: a.currentPaginationNumber,
      maxPaginationNumber: a.maxPaginationNumber,
      nextPage: () => n("nextPage"),
      prevPage: () => n("prevPage"),
      updatePage: (i) => n("updatePage", i)
    }));
    return (i, d) => i.hideFooter ? D("", !0) : (b(), P("div", {
      key: 0,
      class: S(["flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0", [{ "shadow-sm": i.showShadow }, i.footerClassName]])
    }, [
      U(yt, {
        "is-first-page": i.isFirstPage,
        "is-last-page": i.isLastPage,
        onClickNextPage: d[0] || (d[0] = () => n("nextPage")),
        onClickPrevPage: d[1] || (d[1] = () => n("prevPage")),
        class: "sm:hidden flex flex-1"
      }, {
        buttonsPagination: Y(() => d[6] || (d[6] = [
          k("div", { class: "grow" }, null, -1)
        ])),
        _: 1
      }, 8, ["is-first-page", "is-last-page"]),
      k("div", Tn, [
        i.hideRowsPerPage ? D("", !0) : (b(), K(In, {
          key: 0,
          "model-value": i.rowsPerPage,
          "rows-items": i.rowsItems,
          message: i.rowsPerPageMessage,
          "onUpdate:modelValue": d[2] || (d[2] = (o) => n("update:rowsPerPage", o))
        }, null, 8, ["model-value", "rows-items", "message"])),
        i.hidePaginationInfo ? D("", !0) : (b(), K(Nn, {
          key: 1,
          "current-page-first-index": i.currentPageFirstIndex,
          "current-page-last-index": i.currentPageLastIndex,
          "total-items-length": i.totalItemsLength,
          "rows-of-page-separator-message": i.rowsOfPageSeparatorMessage
        }, me({ _: 2 }, [
          i.$slots["pagination-info"] ? {
            name: "default",
            fn: Y((o) => [
              $(i.$slots, "pagination-info", q(le(o)))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])),
        i.$slots.pagination ? $(i.$slots, "pagination", q(Z({ key: 2 }, l.value))) : (b(), K(yt, {
          key: 3,
          "is-first-page": i.isFirstPage,
          "is-last-page": i.isLastPage,
          onClickNextPage: d[4] || (d[4] = () => n("nextPage")),
          onClickPrevPage: d[5] || (d[5] = () => n("prevPage"))
        }, me({ _: 2 }, [
          i.buttonsPagination ? {
            name: "buttonsPagination",
            fn: Y(() => [
              U(Mn, {
                "current-pagination-number": i.currentPaginationNumber,
                "max-pagination-number": i.maxPaginationNumber,
                onUpdatePage: d[3] || (d[3] = (o) => n("updatePage", o))
              }, null, 8, ["current-pagination-number", "max-pagination-number"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["is-first-page", "is-last-page"]))
      ])
    ], 2));
  }
}), Dn = ["id"], Hn = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, On = { class: "relative z-10" }, jn = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, Ct = /* @__PURE__ */ M({
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
    borderRow: { type: Boolean, default: !0 },
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
  setup(e, { expose: t, emit: a }) {
    const n = e, {
      checkboxColumnWidth: l,
      expandColumnWidth: i,
      indexColumnWidth: d,
      rowsItems: o,
      showIndexSymbol: s,
      currentPage: u,
      filterOptions: r,
      headers: p,
      itemsSelected: m,
      loading: c,
      items: v,
      rowsPerPage: w,
      searchField: I,
      searchValue: N,
      serverItemsLength: H,
      showIndex: T,
      sortBy: te,
      sortType: O,
      serverOptions: ie,
      multiSort: ae,
      mustSort: we,
      clickEventType: Pe,
      clickRowToExpand: Ce,
      clickRowToSelect: G,
      fixedExpand: ke,
      fixedCheckbox: B,
      fixedIndex: j,
      batchSelectionThreshold: E,
      expandColumn: z
    } = Zt(n), h = y(() => Aa(n.theme));
    ct("themeClasses", h);
    const x = wt(), C = y(() => !!x.expand), A = y(() => !!x.body), ue = y(
      () => typeof n.expandTransition < "u" ? n.expandTransition : C.value
    ), ne = ee(null), Se = ee(null);
    ct("dataTable", ne);
    const X = a, Ie = y(() => m.value !== null), se = y(() => ie.value !== null), {
      serverOptionsComputed: he,
      updateServerOptionsPage: kt,
      updateServerOptionsSort: St,
      updateServerOptionsRowsPerPage: It
    } = ba(
      ie,
      ae,
      X
    ), {
      clientSortOptions: Ye,
      headerColumns: Ze,
      headersForRender: be,
      updateSortField: $t,
      isMultiSorting: Nt,
      getMultiSortNumber: Bt
    } = ua(
      s,
      l,
      i,
      B,
      ke,
      j,
      p,
      C,
      d,
      Ie,
      se,
      we,
      he,
      T,
      te,
      O,
      ae,
      z,
      St,
      X
    ), {
      rowsItemsComputed: Qe,
      rowsPerPageRef: ye,
      updateRowsPerPage: Xe
    } = ha(
      se,
      o,
      ie,
      w
    ), {
      totalItems: _e,
      selectItemsComputed: Ft,
      totalItemsLength: Ne,
      toggleSelectAll: Rt,
      toggleSelectItem: et,
      isProcessing: At,
      processProgress: Lt
    } = Sa(
      Ye,
      r,
      se,
      v,
      m,
      I,
      N,
      H,
      ae,
      E,
      n.disabledRows,
      X
    ), {
      currentPaginationNumber: de,
      maxPaginationNumber: Be,
      isLastPage: Fe,
      isFirstPage: Re,
      nextPage: Ae,
      prevPage: Le,
      updatePage: $e,
      updateCurrentPaginationNumber: Mt
    } = va(
      u,
      se,
      c,
      Ne,
      ye,
      ie,
      kt
    ), {
      currentPageFirstIndex: tt,
      currentPageLastIndex: at,
      multipleSelectStatus: Tt,
      pageItems: ce
    } = ma(
      de,
      Ie,
      se,
      v,
      ye,
      Ft,
      T,
      _e,
      Ne,
      n.disabledRows
    ), Me = y(() => de.value === 0 ? 0 : (de.value - 1) * ye.value), {
      expandingItemIndexList: He,
      updateExpandingItemIndexList: nt,
      clearExpandingItemIndexList: st
    } = oa(
      ce,
      Me,
      X
    ), {
      fixedHeaders: Oe,
      lastLeftFixedColumn: rt,
      firstRightFixedColumn: lt,
      fixedColumnsInfos: ot,
      showShadow: it
    } = ia(
      be,
      Se
    ), Et = (g) => {
      const W = g.width ?? (Oe.value.length ? 100 : null);
      if (W) return `width: ${W}px; min-width: ${W}px;`;
    }, ut = (g, W = "th") => {
      if (!Oe.value.length) return;
      const F = ot.value.find((L) => L.value === g);
      if (F)
        return `
            position: sticky;
            ${F.position === "left" ? `left: ${F.distance}px;` : `right: ${F.distance}px;`}
            z-index: ${W === "th" ? 3 : 1};
        `;
    }, Dt = (g) => {
      if (!Oe.value.length) return [];
      const W = [];
      return ot.value.find((L) => L.value === g) && (W.push("fixed-column"), g === rt.value ? W.push("fixed-left-shadow") : g === lt.value && W.push("fixed-right-shadow")), W;
    }, Ht = (g) => {
      g.sortable && g.sortType && $t(g.value, g.sortType);
    }, je = (g) => typeof n.disabledRows == "function" ? n.disabledRows(g) : !1, Ot = y(() => ce.value.every((g) => n.disabledRows(g))), jt = (g) => {
      je(g) || et(g);
    }, {
      handleRowClick: qt,
      handleRowDoubleClick: zt,
      handleRowContextMenu: Wt
    } = la(
      Pe,
      Ie,
      T,
      je,
      Ce,
      G,
      nt,
      et,
      X
    );
    return fe(c, (g, W) => {
      he.value && g === !1 && W === !0 && (Mt(he.value.page), st());
    }), fe(ye, (g) => {
      se.value ? It(g) : $e(1);
    }), fe([N, r], () => {
      se.value || $e(1);
    }), fe([de, Ye, I, N, r], () => {
      st();
    }, { deep: !0 }), fe(ce, (g) => {
      X("updatePageItems", g);
    }, { deep: !0 }), fe(_e, (g) => {
      X("updateTotalItems", g);
    }, { deep: !0 }), t({
      currentPageFirstIndex: tt,
      currentPageLastIndex: at,
      clientItemsLength: Ne,
      maxPaginationNumber: Be,
      currentPaginationNumber: de,
      isLastPage: Fe,
      isFirstPage: Re,
      nextPage: Ae,
      prevPage: Le,
      updatePage: $e,
      rowsPerPageOptions: Qe,
      rowsPerPageActiveOption: ye,
      updateRowsPerPageActiveOption: Xe
    }), (g, W) => (b(), P("div", {
      ref_key: "tableWrapper",
      ref: ne,
      class: S(["vdt-table-wrapper relative w-full", [g.wrapperClassName]])
    }, [
      k("div", {
        ref_key: "tableContainer",
        ref: Se,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "show-shadow": f(it) }, g.containerClassName]])
      }, [
        k("table", {
          id: g.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [
            g.tableClassName
          ]])
        }, [
          k("colgroup", null, [
            (b(!0), P(oe, null, Q(f(be), (F, L) => (b(), P("col", {
              key: L,
              style: ge(Et(F))
            }, null, 4))), 128))
          ]),
          f(x)["customize-headers"] ? $(g.$slots, "customize-headers", { key: 0 }) : D("", !0),
          U(dn, Z({
            headers: f(be),
            hideHeader: g.hideHeader,
            fixedHeader: g.fixedHeader,
            headerClassName: g.headerClassName,
            borderCell: g.borderCell,
            lastLeftFixedColumn: f(rt),
            firstRightFixedColumn: f(lt),
            headerItemClassName: g.headerItemClassName,
            areAllVisibleRowsDisabled: Ot.value,
            multipleSelectStatus: f(Tt),
            multiSort: f(ae)
          }, {
            "is-multi-sorting": f(Nt),
            "get-multi-sort-number": f(Bt),
            "get-fixed-distance": ut,
            onHeaderClick: Ht,
            onToggleSelectAll: f(Rt)
          }), me({ _: 2 }, [
            Q(g.$slots, (F, L) => ({
              name: L,
              fn: Y((J) => [
                $(g.$slots, L, q(le(J)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          A.value ? $(g.$slots, "body", q(Z({ key: 1 }, f(ce)))) : f(Ze).length ? (b(), P("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [g.bodyClassName]])
          }, [
            $(g.$slots, "body-prepend", q(le({
              items: f(ce),
              pagination: { isFirstPage: f(Re), isLastPage: f(Fe), currentPaginationNumber: f(de), maxPaginationNumber: f(Be), nextPage: f(Ae), prevPage: f(Le) },
              headers: f(be)
            }))),
            (b(!0), P(oe, null, Q(f(ce), (F, L) => (b(), P(oe, {
              key: F.key || L
            }, [
              U(fn, {
                item: F,
                index: L,
                columns: f(Ze),
                alternating: g.alternating,
                "no-hover": g.noHover,
                "border-cell": g.borderCell,
                "border-row": g.borderRow,
                "body-row-className": g.bodyRowClassName,
                "body-item-class-name": g.bodyItemClassName,
                "is-expanded": f(He).includes(L + Me.value),
                "is-disabled": je(F),
                "expand-column": f(z),
                "get-fixed-distance": ut,
                "get-fixed-column-classes": Dt,
                onClick: (J) => f(qt)(J, F, L),
                onDblclick: (J) => f(zt)(J, F, L),
                onContextmenu: (J) => f(Wt)(J, F),
                onToggleExpand: (J) => f(nt)(L, F, J),
                onToggleSelect: (J) => jt(F)
              }, me({ _: 2 }, [
                Q(g.$slots, (J, dt) => ({
                  name: dt,
                  fn: Y((Ut) => [
                    $(g.$slots, dt, Z({ ref_for: !0 }, Ut))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "border-row", "body-row-className", "body-item-class-name", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              ue.value || f(He).includes(L + Me.value) ? (b(), K(bn, {
                key: 0,
                item: F,
                index: L,
                "columns-count": f(be).length,
                loading: F.expandLoading,
                "is-expanded": f(He).includes(L + Me.value),
                "body-expand-row-className": g.bodyExpandRowClassName
              }, {
                default: Y(() => [
                  $(g.$slots, "expand", Z({ ref_for: !0 }, F))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : D("", !0)
            ], 64))), 128)),
            $(g.$slots, "body-append", q(le({
              items: f(ce),
              pagination: { isFirstPage: f(Re), isLastPage: f(Fe), currentPaginationNumber: f(de), maxPaginationNumber: f(Be), nextPage: f(Ae), prevPage: f(Le), updatePage: f($e) },
              headers: f(be)
            })))
          ], 2)) : D("", !0)
        ], 10, Dn),
        f(c) ? (b(), P("div", Hn, [
          k("div", On, [
            $(g.$slots, "loading", {}, () => [
              U(_t)
            ])
          ])
        ])) : D("", !0),
        !f(ce).length && !f(c) ? (b(), P("div", jn, [
          $(g.$slots, "empty-message", {}, () => [
            De(V(g.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      U(En, Z({
        hideFooter: g.hideFooter,
        hideRowsPerPage: g.hideRowsPerPage,
        hidePaginationInfo: g.hidePaginationInfo,
        buttonsPagination: g.buttonsPagination,
        showShadow: f(it),
        footerClassName: g.footerClassName,
        rowsPerPage: f(ye),
        rowsItems: f(Qe),
        rowsPerPageMessage: g.rowsPerPageMessage,
        rowsOfPageSeparatorMessage: g.rowsOfPageSeparatorMessage,
        currentPageFirstIndex: f(tt),
        currentPageLastIndex: f(at),
        totalItemsLength: f(Ne),
        currentPaginationNumber: f(de),
        maxPaginationNumber: f(Be),
        isFirstPage: f(Re),
        isLastPage: f(Fe)
      }, {
        "onUpdate:rowsPerPage": f(Xe),
        onNextPage: f(Ae),
        onPrevPage: f(Le),
        onUpdatePage: f($e)
      }), me({ _: 2 }, [
        g.$slots["pagination-info"] ? {
          name: "pagination-info",
          fn: Y((F) => [
            $(g.$slots, "pagination-info", q(le(F)))
          ]),
          key: "0"
        } : void 0,
        g.$slots.pagination ? {
          name: "pagination",
          fn: Y((F) => [
            $(g.$slots, "pagination", q(le(F)))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]),
      Ve(U(ra, { progress: f(Lt) }, null, 8, ["progress"]), [
        [Ke, f(At)]
      ])
    ], 2));
  }
}), qn = (e) => {
  e.component("DataTable", Ct);
};
Ct.install = qn;
export {
  Un as createFilter,
  Ct as default,
  qn as install
};
