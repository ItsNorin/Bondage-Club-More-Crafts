// ==UserScript==
// @name         Bondage Club More Crafts Loader
// @namespace    BC-More-Crafts
// @description  Adds more crafted item slots
// @author       ItsNorin
// @version      0.1
// @match        https://bondageprojects.elementfx.com/*
// @match        https://www.bondageprojects.elementfx.com/*
// @match        https://bondage-europe.com/*
// @match        https://www.bondage-europe.com/*
// @match        http://localhost:*/*
// @homepage     https://github.com/ItsNorin/Bondage-Club-XToys-Integration
// @downloadURL  https://itsnorin.github.io/Bondage-Club-XToys-Integration/BC-XToysLoader.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

const BC_MoreCrafts_Version = "0.1";

var bcModSdk = function () { "use strict"; const e = "1.1.0"; function o(e) { alert("Mod ERROR:\n" + e); const o = new Error(e); throw console.error(o), o } const t = new TextEncoder; function n(e) { return !!e && "object" == typeof e && !Array.isArray(e) } function r(e) { const o = new Set; return e.filter((e => !o.has(e) && o.add(e))) } const i = new Map, a = new Set; function d(e) { a.has(e) || (a.add(e), console.warn(e)) } function s(e) { const o = [], t = new Map, n = new Set; for (const r of p.values()) { const i = r.patching.get(e.name); if (i) { o.push(...i.hooks); for (const [o, a] of i.patches.entries()) t.has(o) && t.get(o) !== a && d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o) || ""}\nPatch2:\n${a}`), t.set(o, a), n.add(r.name) } } o.sort(((e, o) => o.priority - e.priority)); const r = function (e, o) { if (0 === o.size) return e; let t = e.toString().replaceAll("\r\n", "\n"); for (const [n, r] of o.entries()) t.includes(n) || d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`) }(e.original, t); let i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, e.name, n), d = r.apply(this, o); return null == a || a(), d }; for (let t = o.length - 1; t >= 0; t--) { const n = o[t], r = i; i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, e.name, n.mod), d = n.hook.apply(this, [o, e => { if (1 !== arguments.length || !Array.isArray(o)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`); return r.call(this, e) }]); return null == a || a(), d } } return { hooks: o, patches: t, patchesSources: n, enter: i, final: r } } function c(e, o = !1) { let r = i.get(e); if (r) o && (r.precomputed = s(r)); else { let o = window; const a = e.split("."); for (let t = 0; t < a.length - 1; t++)if (o = o[a[t]], !n(o)) throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const d = o[a[a.length - 1]]; if ("function" != typeof d) throw new Error(`ModSDK: Function ${e} to be patched not found`); const c = function (e) { let o = -1; for (const n of t.encode(e)) { let e = 255 & (o ^ n); for (let o = 0; o < 8; o++)e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1; o = o >>> 8 ^ e } return ((-1 ^ o) >>> 0).toString(16).padStart(8, "0").toUpperCase() }(d.toString().replaceAll("\r\n", "\n")), l = { name: e, original: d, originalHash: c }; r = Object.assign(Object.assign({}, l), { precomputed: s(l), router: () => { }, context: o, contextProperty: a[a.length - 1] }), r.router = function (e) { return function (...o) { return e.precomputed.enter.apply(this, [o]) } }(r), i.set(e, r), o[r.contextProperty] = r.router } return r } function l() { const e = new Set; for (const o of p.values()) for (const t of o.patching.keys()) e.add(t); for (const o of i.keys()) e.add(o); for (const o of e) c(o, !0) } function f() { const e = new Map; for (const [o, t] of i) e.set(o, { name: o, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((e => e.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return e } const p = new Map; function u(e) { p.get(e.name) !== e && o(`Failed to unload mod '${e.name}': Not registered`), p.delete(e.name), e.loaded = !1, l() } function g(e, t, r) { "string" == typeof e && "string" == typeof t && (alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`), e = { name: e, fullName: e, version: t }, t = { allowReplace: !0 === r }), e && "object" == typeof e || o("Failed to register mod: Expected info object, got " + typeof e), "string" == typeof e.name && e.name || o("Failed to register mod: Expected name to be non-empty string, got " + typeof e.name); let i = `'${e.name}'`; "string" == typeof e.fullName && e.fullName || o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`), i = `'${e.fullName} (${e.name})'`, "string" != typeof e.version && o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`), e.repository || (e.repository = void 0), void 0 !== e.repository && "string" != typeof e.repository && o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`), null == t && (t = {}), t && "object" == typeof t || o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`); const a = !0 === t.allowReplace, d = p.get(e.name); d && (d.allowReplace && a || o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(d)); const s = e => { "string" == typeof e && e || o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`); let t = g.patching.get(e); return t || (t = { hooks: [], patches: new Map }, g.patching.set(e, t)), t }, f = { unload: () => u(g), hookFunction: (e, t, n) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); "number" != typeof t && o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`), "function" != typeof n && o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`); const a = { mod: g.name, priority: t, hook: n }; return r.hooks.push(a), l(), () => { const e = r.hooks.indexOf(a); e >= 0 && (r.hooks.splice(e, 1), l()) } }, patchFunction: (e, t) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); n(t) || o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`); for (const [n, a] of Object.entries(t)) "string" == typeof a ? r.patches.set(n, a) : null === a ? r.patches.delete(n) : o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`); l() }, removePatches: e => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); s(e).patches.clear(), l() }, callOriginal: (e, t, n) => (g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`), "string" == typeof e && e || o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`), Array.isArray(t) || o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`), function (e, o, t = window) { return c(e).original.apply(t, o) }(e, t, n)), getOriginalHash: e => ("string" == typeof e && e || o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`), c(e).originalHash) }, g = { name: e.name, fullName: e.fullName, version: e.version, repository: e.repository, allowReplace: a, api: f, loaded: !0, patching: new Map }; return p.set(e.name, g), Object.freeze(f) } function h() { const e = []; for (const o of p.values()) e.push({ name: o.name, fullName: o.fullName, version: o.version, repository: o.repository }); return e } let m; const y = function () { if (void 0 === window.bcModSdk) return window.bcModSdk = function () { const o = { version: e, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: f, errorReporterHooks: Object.seal({ hookEnter: null, hookChainExit: null }) }; return m = o, Object.freeze(o) }(); if (n(window.bcModSdk) || o("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== e && (alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk.version.startsWith("1.0.") && void 0 === window.bcModSdk._shim10register)) { const e = window.bcModSdk, o = Object.freeze(Object.assign(Object.assign({}, e), { registerMod: (o, t, n) => o && "object" == typeof o && "string" == typeof o.name && "string" == typeof o.version ? e.registerMod(o.name, o.version, "object" == typeof t && !!t && !0 === t.allowReplace) : e.registerMod(o, t, n), _shim10register: !0 })); window.bcModSdk = o } return window.bcModSdk }(); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y }();

const modApi = bcModSdk.registerMod({
    name: "Bondage Club More Crafts",
    fullName: "BC_MoreCrafts",
    version: BC_MoreCrafts_Version,
    repository: "https://github.com/ItsNorin/Bondage-Club-More-Crafts",
});

console.log("Starting " + "BC More Crafts" + " version " + BC_MoreCrafts_Version + ".");


(async function () {
    await waitFor(() => ServerIsConnected && ServerSocket);

    // pages
    modApi.hookFunction(
        'CraftingClick',
        0,
        (args, next) => {
            // Can always exit or cancel
            if (MouseIn(1895, 15, 90, 90) && !["Color", "Extended", "OverridePriority"].includes(CraftingMode)) CraftingExit();
            if (MouseIn(1790, 15, 90, 90) && !["Color", "Extended", "Slot", "OverridePriority"].includes(CraftingMode)) return CraftingModeSet("Slot");

            // In slot mode, we can select which item slot to craft
            if (CraftingMode == "Slot") {

                // 12-ish pages of slots
                if (MouseIn(1475, 15, 90, 90)) {
                    CraftingOffset = CraftingOffset - 20;
                    if (CraftingOffset < 0) CraftingOffset = 240 - 20;
                } else if (MouseIn(1580, 15, 90, 90)) {
                    CraftingOffset = CraftingOffset + 20;
                    if (CraftingOffset >= 240) CraftingOffset = 0;
                }

                // Enter/Exit destroy item mode; or exit reorder mode.
                if (MouseIn(1790, 15, 90, 90)) {
                    if (CraftingReorderMode != "None") {
                        CraftingReorderModeSet("None");
                    } else {
                        CraftingDestroy = !CraftingDestroy;
                    }
                }

                // Craft slot reordering mode.
                if (MouseIn(1675, 15, 90, 90)) {
                    if (CraftingDestroy) CraftingDestroy = false;

                    CraftingReorderModeSet(); // Advance mode
                }

                // Scan 20 items for clicks
                for (let S = 0; S < 20; S++) {

                    // If the box was clicked
                    let X = (S % 4) * 500 + 15;
                    let Y = Math.floor(S / 4) * 180 + 130;
                    const Craft = Player.Crafting[S + CraftingOffset];
                    if (!MouseIn(X, Y, 470, 140)) continue;

                    // Reorder, destroy, edit or create a new crafting item
                    if (CraftingReorderMode == "Select") {
                        // If the index isn't present, add it.  If it
                        // is present, delete it.  This has the effect
                        // of toggling the slot in the UI.
                        const idx = CraftingReorderList.indexOf(S + CraftingOffset);
                        if (idx >= 0) {
                            CraftingReorderList.splice(idx, 1);
                        } else {
                            CraftingReorderList.push(S + CraftingOffset);
                        }
                    } else if (CraftingReorderMode == "Place") {
                        // Swap the slot clicked with the first entry in the list.
                        const idx = CraftingReorderList.shift();
                        const item = Player.Crafting[S + CraftingOffset];
                        Player.Crafting[S + CraftingOffset] = Player.Crafting[idx];
                        Player.Crafting[idx] = item;
                        if (CraftingReorderList.length <= 0) {
                            // List exhausted; commit changes and end reorder mode.
                            CraftingReorderModeSet("None");
                        }
                    } else if (CraftingDestroy) {
                        if (Craft && Craft.Name) {
                            if (S + CraftingOffset < Player.Crafting.length) Player.Crafting[S + CraftingOffset] = null;
                            CraftingSaveServer();
                        }
                    } else if (Craft && Craft.Name) {
                        CraftingSlot = S + CraftingOffset;
                        CraftingSelectedItem = CraftingConvertItemToSelected(Craft);
                        CraftingModeSet("Name");
                    } else {
                        CraftingSlot = S + CraftingOffset;
                        CraftingSelectedItem = {
                            Name: "",
                            Description: "",
                            Color: "Default",
                            Asset: null,
                            Property: "Normal",
                            Lock: null,
                            Private: false,
                            TypeRecord: null,
                            ItemProperty: {},
                            get OverridePriority() {
                                return this.ItemProperty.OverridePriority;
                            },
                            set OverridePriority(value) {
                                if (value == null) {
                                    delete this.ItemProperty.OverridePriority;
                                } else {
                                    this.ItemProperty.OverridePriority = value;
                                }
                            },
                        };
                        CraftingModeSet("Item");
                        CraftingItemListBuild();
                    }

                }
                return;
            }

            // In item selection mode, the player picks an item from her inventory
            if (CraftingMode == "Item") {
                if (MouseIn(1580, 15, 90, 90)) {
                    CraftingOffset = CraftingOffset - 24;
                    if (CraftingOffset < 0) CraftingOffset = Math.floor(CraftingItemList.length / 24) * 24;
                }
                if (MouseIn(1685, 15, 90, 90)) {
                    CraftingOffset = CraftingOffset + 24;
                    if (CraftingOffset >= CraftingItemList.length) CraftingOffset = 0;
                }
                for (let I = CraftingOffset; I < CraftingItemList.length && I < CraftingOffset + 24; I++) {
                    const X = ((I - CraftingOffset) % 8) * 249 + 17;
                    const Y = Math.floor((I - CraftingOffset) / 8) * 290 + 130;
                    const asset = CraftingItemList[I];
                    if (MouseIn(X, Y, 225, 275)) {
                        CraftingSelectedItem.Asset = asset;
                        CraftingSelectedItem.TypeRecord = {};
                        CraftingSelectedItem.Lock = null;
                        CraftingSelectedItem.Color = CraftingSelectedItem.Asset.DefaultColor.join(",");
                        CraftingModeSet("Property");
                        ElementRemove("InputSearch");
                    }
                }
                return;
            }

            // In property mode, the user can select a special property to apply to the item
            if (CraftingMode == "Property") {
                let Pos = 0;
                for (const [Name, Allow] of CraftingPropertyMap)
                    if (Allow(CraftingSelectedItem.Asset)) {
                        let X = (Pos % 4) * 500 + 15;
                        let Y = Math.floor(Pos / 4) * 175 + 130;
                        if (MouseIn(X, Y, 470, 150)) {
                            CraftingSelectedItem.Property = Name;
                            if (CraftingSelectedItem.Lock) CraftingModeSet("Name");
                            else CraftingModeSet("Lock");
                            return;
                        }
                        Pos++;
                    }
                return;
            }

            // In lock selection mode, the user can pick a default lock or no lock at all
            if (CraftingMode == "Lock") {
                if (MouseIn(1685, 15, 90, 90)) {
                    CraftingSelectedItem.Lock = null;
                    CraftingModeSet("Name");
                }
                let Pos = 0;
                for (let L = 0; L < CraftingLockList.length; L++)
                    for (let Item of Player.Inventory)
                        if ((Item.Asset != null) && (Item.Asset.Name == CraftingLockList[L]) && Item.Asset.IsLock) {
                            let X = (Pos % 8) * 249 + 17;
                            let Y = Math.floor(Pos / 8) * 290 + 130;
                            if (MouseIn(X, Y, 225, 275)) {
                                CraftingModeSet("Name");
                                CraftingSelectedItem.Lock = Item.Asset;
                            }
                            Pos++;
                        }
                return;
            }

            // In naming mode, we can also modify the color or go back to previous screens
            if (CraftingMode == "Name") {
                if (MouseIn(1685, 15, 90, 90)) {
                    const prop = CraftingConvertSelectedToItem();
                    if (prop.Name == "") return;
                    Player.Crafting[CraftingSlot] = prop;
                    CraftingSelectedItem = null;
                    CraftingSaveServer();
                    CraftingModeSet("Slot");
                } else if (MouseIn(880, 900, 90, 90)) {
                    CraftingNakedPreview = !CraftingNakedPreview;
                    CraftingUpdatePreview();
                } else if (MouseIn(80, 250, 225, 275)) {
                    CraftingModeSet("Item");
                    CraftingItemListBuild();
                    return null;
                } else if (MouseIn(425, 250, 225, 275) && CraftingSelectedItem.Asset.AllowLock) {
                    CraftingModeSet("Lock");
                    return null;
                } else if (MouseIn(80, 650, 570, 190)) {
                    CraftingModeSet("Property");
                    return null;
                } else if (MouseIn(1843, 598, 64, 64)) {
                    CraftingModeSet("Color");
                    const Item = InventoryGet(CraftingPreview, CraftingSelectedItem.Asset.DynamicGroupName);
                    ItemColorLoad(CraftingPreview, Item, 1200, 25, 775, 950, true);
                    ItemColorOnExit((c, i) => {
                        CraftingModeSet("Name");
                        CraftingSelectedItem.Color = Array.isArray(i.Color) ? i.Color.join(",") : i.Color || "Default";
                        ElementValue("InputColor", CraftingSelectedItem.Color);
                        CraftingUpdatePreview();
                    });
                } else if (MouseIn(1175, 768, 64, 64)) {
                    CraftingSelectedItem.Private = !CraftingSelectedItem.Private;
                } else if (MouseIn(1175, 858, 60, 60) && CraftingSelectedItem.Asset.Archetype) {
                    const item = CraftingPreview.Appearance.find(i => {
                        return i.Asset.Name === CraftingSelectedItem.Asset.Name && i.Asset.DynamicGroupName === CraftingSelectedItem.Asset.DynamicGroupName;
                    });
                    if (item !== undefined) {
                        DialogExtendItem(item);
                        CraftingModeSet("Extended");
                    }
                } else if (MouseIn(1276, 683, 60, 60)) {
                    CraftingModeSet("OverridePriority");
                }
                return;
            }

            // In color selection mode, we allow picking a color
            if (CraftingMode == "Color") {
                if (MouseIn(880, 900, 90, 90)) {
                    CraftingNakedPreview = !CraftingNakedPreview;
                    CraftingUpdatePreview();
                } else if (MouseIn(1200, 25, 775, 950)) {
                    ItemColorClick(CraftingPreview, CraftingSelectedItem.Asset.DynamicGroupName, 1200, 25, 775, 950, true);
                    setTimeout(CraftingRefreshPreview, 100);
                }
                return;
            }

            // Need the `DialogFocusItem` check here as there's a bit of a race condition
            if (CraftingMode == "Extended" && DialogFocusItem) {
                CommonCallFunctionByNameWarn(`Inventory${DialogFocusItem.Asset.Group.Name}${DialogFocusItem.Asset.Name}Click`);
            }

            if (CraftingMode == "OverridePriority") {
                if (MouseIn(1895, 15, 90, 90)) {
                    CraftingModeSet("Name");
                } else if (MouseIn(1685, 120, 90, 90)) {
                    for (const layer of CraftingSelectedItem.Asset.Layer) {
                        const element = /** @type {HTMLInputElement} */(document.getElementById(`InputPriority${layer.Name}`));
                        if (element == null) {
                            continue;
                        }
                        element.value = element.dataset.propertyDefault;
                    }
                    delete CraftingSelectedItem.ItemProperty.OverridePriority;
                    CraftingUpdatePreview();
                } else if (CraftingSelectedItem.Asset.Layer.length > 20) {
                    const start = CraftingOverridePriorityOffset;
                    const stop = CraftingSelectedItem.Asset.Layer.length;
                    if (MouseIn(1895, 120, 90, 90)) {
                        CraftingOverridePriorityOffset = (start + 20) > stop ? 0 : start + 20;
                    } else if (MouseIn(1790, 120, 90, 90)) {
                        CraftingOverridePriorityOffset = (start - 20) < 0 ? 20 * (Math.ceil(stop / 20) - 1) : start - 20;
                    }
                }
            }
        }
    );

    // pages
    modApi.hookFunction(
        'CraftingRun',
        0,
        (args, next) => {
            // The exit button is everywhere
            if (!["Color", "Extended", "OverridePriority"].includes(CraftingMode)) {
                DrawButton(1895, 15, 90, 90, "", "White", "Icons/Exit.png", TextGet("Exit"));
            }
            if (!["Color", "Slot", "Extended", "OverridePriority"].includes(CraftingMode)) {
                DrawButton(1790, 15, 90, 90, "", "White", "Icons/Cancel.png", TextGet("Cancel"));
            }

            // In slot selection mode, we show the slots to select from
            if (CraftingMode == "Slot") {
                let BGColor;
                let TrashCancel = false;

                switch (CraftingReorderMode) {
                    case "None":
                        BGColor = CraftingDestroy ? "Pink" : "White";
                        break;

                    case "Select":
                        BGColor = "Yellow";
                        break;

                    case "Place":
                        BGColor = "Grey";
                        break;
                }

                DrawButton(1475, 15, 90, 90, "", "White", "Icons/Prev.png", TextGet("Previous"));
                DrawButton(1580, 15, 90, 90, "", "White", "Icons/Next.png", TextGet("Next"));
                DrawButton(1685, 15, 90, 90, "", "White", "Icons/Swap.png", TextGet("Reorder"));
                if (CraftingReorderMode == "Select") {
                    DrawText(`${TextGet("ReorderSelect")} ${CraftingReorderList.length}`, 737, 60, "White", "Black");
                } else if (CraftingReorderMode == "Place") {
                    DrawText(`${TextGet("ReorderPlace")} ${CraftingReorderList.length}`, 737, 60, "White", "Black");
                } else if (CraftingDestroy) {
                    DrawText(`${TextGet("SelectDestroy")} ${Math.floor(CraftingOffset / 20) + 1} / ${240 / 20}.`, 737, 60, "White", "Black");
                } else {
                    DrawText(`${TextGet("SelectSlot")} ${Math.floor(CraftingOffset / 20) + 1} / ${240 / 20}.`, 737, 60, "White", "Black");
                    TrashCancel = true;
                }
                if (TrashCancel) {
                    DrawButton(1790, 15, 90, 90, "", "White", "Icons/Trash.png", TextGet("Destroy"));
                } else {
                    DrawButton(1790, 15, 90, 90, "", "White", "Icons/Cancel.png", TextGet("Cancel"));
                }
                for (let S = CraftingOffset; S < CraftingOffset + 20; S++) {
                    let X = ((S - CraftingOffset) % 4) * 500 + 15;
                    let Y = Math.floor((S - CraftingOffset) / 4) * 180 + 130;
                    let Craft = Player.Crafting[S];
                    switch (CraftingReorderMode) {
                        case "Select":
                            BGColor = CraftingReorderList.includes(S) ? "Chartreuse" : "Yellow";
                            break;

                        case "Place":
                            BGColor = CraftingReorderList.includes(S) ? "Green" : "Grey";
                            break;

                        default:
                            break;
                    }
                    if (!Craft) {
                        DrawButton(X, Y, 470, 140, TextGet("EmptySlot"), BGColor);
                    } else {
                        DrawButton(X, Y, 470, 140, "", BGColor);
                        DrawTextFit(Craft.Name, X + 295, Y + 25, 315, "Black", "Silver");
                        for (let Item of Player.Inventory) {
                            if (Item.Asset.Name == Craft.Item) {
                                DrawImageResize("Assets/" + Player.AssetFamily + "/" + Item.Asset.DynamicGroupName + "/Preview/" + Item.Asset.Name + ".png", X + 3, Y + 3, 135, 135);
                                DrawTextFit(Item.Asset.Description, X + 295, Y + 70, 315, "Black", "Silver");
                                DrawTextFit(TextGet("Property" + Craft.Property), X + 295, Y + 115, 315, "Black", "Silver");
                                if ((Craft.Lock != null) && (Craft.Lock != ""))
                                    DrawImageResize("Assets/" + Player.AssetFamily + "/ItemMisc/Preview/" + Craft.Lock + ".png", X + 70, Y + 70, 70, 70);
                                break;
                            }
                        }
                    }
                }
            }

            // In item selection mode, we show all restraints from the player inventory
            if (CraftingMode == "Item") {
                DrawText(TextGet("SelectItem"), 1120, 60, "White", "Black");
                DrawButton(1580, 15, 90, 90, "", "White", "Icons/Prev.png", TextGet("Previous"));
                DrawButton(1685, 15, 90, 90, "", "White", "Icons/Next.png", TextGet("Next"));
                ElementPosition("InputSearch", 315, 52, 600);
                for (let I = CraftingOffset; I < CraftingItemList.length && I < CraftingOffset + 24; I++) {
                    let Item = CraftingItemList[I];
                    let X = ((I - CraftingOffset) % 8) * 249 + 17;
                    let Y = Math.floor((I - CraftingOffset) / 8) * 290 + 130;
                    let Icons = DialogGetAssetIcons(Item);
                    DrawAssetPreview(X, Y, Item, { Icons, Hover: true });
                }
            }

            // In item selection mode, we show all restraints from the player inventory
            if (CraftingMode == "Property") {
                DrawText(TextGet("SelectProperty").replace("AssetDescription", CraftingSelectedItem.Asset.Description), 880, 60, "White", "Black");
                let Pos = 0;
                for (const [Name, Allow] of CraftingPropertyMap)
                    if (Allow(CraftingSelectedItem.Asset)) {
                        let X = (Pos % 4) * 500 + 15;
                        let Y = Math.floor(Pos / 4) * 175 + 130;
                        DrawButton(X, Y, 470, 150, "", "White");
                        DrawText(TextGet("Property" + Name), X + 235, Y + 30, "Black", "Silver");
                        DrawTextWrap(TextGet("Description" + Name), X + 20, Y + 50, 440, 100, "Black", null, 2);
                        Pos++;
                    }
            }

            // In lock selection mode, the player can auto-apply a lock to it's item
            if (CraftingMode == "Lock") {
                DrawButton(1685, 15, 90, 90, "", "White", "Icons/Unlock.png", TextGet("NoLock"));
                DrawText(TextGet("SelectLock").replace("AssetDescription", CraftingSelectedItem.Asset.Description).replace("PropertyName", TextGet("Property" + CraftingSelectedItem.Property)), 830, 60, "White", "Black");
                let Pos = 0;
                for (let L = 0; L < CraftingLockList.length; L++)
                    for (let Item of Player.Inventory)
                        if ((Item.Asset != null) && (Item.Asset.Name == CraftingLockList[L]) && Item.Asset.IsLock) {
                            let X = (Pos % 8) * 249 + 17;
                            let Y = Math.floor(Pos / 8) * 290 + 130;
                            let Description = Item.Asset.Description;
                            let Background = MouseIn(X, Y, 225, 275) && !CommonIsMobile ? "cyan" : "#fff";
                            let Foreground = "Black";
                            let Icons = DialogGetAssetIcons(Item.Asset);
                            DrawAssetPreview(X, Y, Item.Asset, { Hover: true, Description, Background, Foreground, Icons });
                            Pos++;
                        }
            }

            // In lock selection mode, the player can auto-apply a lock to it's item
            if (CraftingMode == "Name") {
                DrawButton(1685, 15, 90, 90, "", "White", "Icons/Accept.png", TextGet("Accept"));
                DrawText(TextGet("SelectName").replace("AssetDescription", CraftingSelectedItem.Asset.Description).replace("PropertyName", TextGet("Property" + CraftingSelectedItem.Property)), 830, 60, "White", "Black");
                let Icons = DialogGetAssetIcons(CraftingSelectedItem.Asset);
                DrawAssetPreview(80, 250, CraftingSelectedItem.Asset, { Hover: true, Icons });
                if (CraftingSelectedItem.Lock != null) {
                    let Description = CraftingSelectedItem.Lock.Description;
                    Icons = DialogGetAssetIcons(CraftingSelectedItem.Lock);
                    DrawAssetPreview(425, 250, CraftingSelectedItem.Lock, { Hover: true, Description, Icons });
                } else DrawButton(425, 250, 225, 275, TextGet("NoLock"), "White");
                DrawButton(80, 650, 570, 190, "", "White");
                DrawCharacter(CraftingPreview, 700, 100, 0.9, false);
                DrawButton(880, 900, 90, 90, "", "white", `Icons/${CraftingNakedPreview ? "Dress" : "Naked"}.png`);
                DrawText(TextGet("Property" + CraftingSelectedItem.Property), 365, 690, "Black", "Silver");
                DrawTextWrap(TextGet("Description" + CraftingSelectedItem.Property), 95, 730, 540, 100, "Black", null, 2);
                DrawText(TextGet("EnterName"), 1550, 200, "White", "Black");
                ElementPosition("InputName", 1550, 275, 750);
                DrawText(TextGet("EnterDescription"), 1550, 375, "White", "Black");
                ElementPosition("InputDescription", 1550, 450, 750);
                DrawText(TextGet("EnterColor"), 1550, 550, "White", "Black");
                ElementPosition("InputColor", 1510, 625, 670);
                DrawButton(1843, 598, 64, 64, "", "White", "Icons/Color.png");
                DrawText(TextGet("EnterPriority"), 1550, 715, "White", "Black");
                ElementPosition("InputPriority", 1225, 710, 100);
                DrawText(TextGet("EnterPrivate"), 1550, 805, "White", "Black");
                DrawButton(1175, 768, 64, 64, "", "White", CraftingSelectedItem.Private ? "Icons/Checked.png" : "");
                if (CraftingSelectedItem.Asset.Archetype) {
                    DrawText(TextGet("EnterType"), 1550, 890, "White", "Black");
                    DrawButton(1175, 858, 60, 60, "", "White", "Icons/Small/Use.png");
                }
                DrawButton(1276, 683, 60, 60, "", "White", "Icons/Small/Use.png");
            }

            // In color mode, the player can change the color of each parts of the item
            if (CraftingMode == "Color") {
                DrawText(TextGet("SelectColor"), 600, 60, "White", "Black");
                DrawCharacter(CraftingPreview, -100, 100, 2, false);
                DrawCharacter(CraftingPreview, 700, 100, 0.9, false);
                DrawButton(880, 900, 90, 90, "", "white", `Icons/${CraftingNakedPreview ? "Dress" : "Naked"}.png`);
                ItemColorDraw(CraftingPreview, CraftingSelectedItem.Asset.DynamicGroupName, 1200, 25, 775, 950, true);
            }

            // Need the `DialogFocusItem` check here as there's a bit of a race condition
            if (CraftingMode == "Extended" && DialogFocusItem) {
                CommonCallFunctionByNameWarn(`Inventory${DialogFocusItem.Asset.Group.Name}${DialogFocusItem.Asset.Name}Draw`);
                DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
                DrawCharacter(CraftingPreview, 500, 100, 0.9, false);
            }

            if (CraftingMode == "OverridePriority") {
                DrawText(TextGet("SelectPriority"), 830, 60, "White", "Black");
                DrawCharacter(CraftingPreview, 500, 100, 0.9, false);
                DrawButton(1895, 15, 90, 90, "", "White", "Icons/Exit.png", TextGet("Return"));
                DrawButton(1685, 120, 90, 90, "", "White", "Icons/Swap.png", "Reset");
                DrawTextFit(
                    `${1 + CraftingOverridePriorityOffset / 20} / ${Math.ceil(CraftingSelectedItem.Asset.Layer.length / 20)}`,
                    1835, 60, 120, "White", "Black",
                );
                if (CraftingSelectedItem.Asset.Layer.length > 20) {
                    DrawButton(1790, 120, 90, 90, "", "White", "Icons/Prev.png", TextGet("Previous"));
                    DrawButton(1895, 120, 90, 90, "", "White", "Icons/Next.png", TextGet("Next"));
                } else {
                    DrawButton(1790, 120, 90, 90, "", "Gray", "Icons/Prev.png", TextGet("Previous"), true);
                    DrawButton(1895, 120, 90, 90, "", "Gray", "Icons/Next.png", TextGet("Next"), true);
                }

                MainCanvas.textAlign = "left";
                const start = CraftingOverridePriorityOffset;
                const stop = start + 20;
                for (const [i, layer] of CommonEnumerate(CraftingSelectedItem.Asset.Layer)) {
                    const element = document.getElementById(`InputPriority${layer.Name}`);
                    if (element == null) {
                        continue;
                    }

                    if (i >= start && i < stop) {
                        element.style.display = "block";
                        const x = 1000 + Math.floor((i - start) / 10) * 500;
                        const y = 250 + (i % 10) * 70;
                        ElementPosition(element.id, x, y, 100);

                        const key = `${CraftingSelectedItem.Asset.Group.Name}${CraftingSelectedItem.Asset.Name}${layer.Name}`;
                        let layerName = CraftingLayerNames.get(key);
                        if (layerName === key) {
                            layerName = layer.Name;
                        } else if (!layerName) {
                            layerName = CraftingSelectedItem.Asset.Description;
                        }
                        DrawTextFit(layerName, x + 50, y + 2, 400, "White", "Black");
                    } else {
                        element.style.display = "none";
                    }
                }
                MainCanvas.textAlign = "center";
            }
        }
    )

    // load 240 items instead
    modApi.hookFunction(
        'CraftingLoadServer',
        1,
        (args, next) => {
            Player.Crafting = [];
            let Refresh = false;
            /** @type {Record<number, unknown>} */
            const CriticalErrors = {};
            const data = CraftingDecompressServerData(args[0]);
            for (const [i, item] of CommonEnumerate(data)) {
                if (item == null) {
                    Player.Crafting.push(null);
                    continue;
                }

                // Make sure that the item is a valid craft
                switch (CraftingValidate(item)) {
                    case CraftingStatusType.OK:
                        Player.Crafting.push(item);
                        break;
                    case CraftingStatusType.ERROR:
                        Player.Crafting.push(item);
                        Refresh = true;
                        break;
                    case CraftingStatusType.CRITICAL_ERROR:
                        Player.Crafting.push(null);
                        Refresh = true;
                        CriticalErrors[i] = (item);
                        break;
                }

                // Too many items, skip the rest
                if (Player.Crafting.length >= 240) break;
            }

            /**
             * One or more validation errors were encountered that were successfully resolved;
             * push the fixed items back to the server */
            if (Refresh) {
                const nCritical = Object.keys(CriticalErrors).length;
                if (nCritical > 0) {
                    console.warn(`Removing ${nCritical} corrupted crafted items`, CriticalErrors);
                }
                CraftingSaveServer();
            }
        }
    )

    // bypass slicing crafts on login, increase to 240 items
    modApi.hookFunction(
        'LoginResponse',
        1,
        (args, next) => {
            var crafting = CraftingDecompressServerData(args[0].Crafting);
            next(args);

			CraftingLoadServer(crafting);
            //console.log(Player.Crafting);
            if (Player.Crafting.length > 240) Player.Crafting = Player.Crafting.slice(0, 240);
        }
    )
})();

async function waitFor(func, cancelFunc = () => false) {
    while (!func()) {
        if (cancelFunc()) return false;
        await sleep(10);
    }
    return true;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}