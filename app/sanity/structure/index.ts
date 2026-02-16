import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure';
import {LayoutTemplate, PanelsTopLeft, Package, Paintbrush} from 'lucide-react';
import {collections} from './collection-structure';
import {products} from './product-structure';
import {singleton, SINGLETONS} from './singletons';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S) =>
  S.document().views([S.view.form()]);

export const structure: StructureResolver = (S, context) => {
  return S.list()
    .title('Content')
    .items([
      // 🏠 ===== Core Pages =====
      singleton(S, SINGLETONS.home),
      S.documentTypeListItem('page').icon(PanelsTopLeft),
      products(S, context),
      collections(S, context),
      S.divider(),

      // 🧩 ===== Global Layout =====
      singleton(S, SINGLETONS.header),
      singleton(S, SINGLETONS.footer),
      S.divider(),

      // ⚙️ ===== Global Settings =====
      singleton(S, SINGLETONS.settings),
      S.divider(),

      // 🎨 ===== Design & Theme =====
      S.listItem()
        .title('Design')
        .icon(Paintbrush)
        .child(
          S.list()
            .title('Design')
            .items([
              singleton(S, SINGLETONS.productSectionDesign)
                .id('productSectionDesign')
                .title('Product section')
                .icon(Package),
              S.documentTypeListItem('colorScheme').showIcon(true),
              singleton(S, SINGLETONS.typography),
              singleton(S, SINGLETONS.themeContent).title('Theme content'),
            ]),
        ),
      S.divider(),

      // 🧱 ===== Templates =====
      S.listItem()
        .title('Templates')
        .icon(LayoutTemplate)
        .child(
          S.list()
            .title('Templates')
            .items([
              S.listItem()
                .title('Products')
                .icon(false)
                .child(S.documentTypeList('productTemplate')),
              S.listItem()
                .title('Collections')
                .icon(false)
                .child(S.documentTypeList('collectionTemplate')),
            ]),
        ),
    ]);
};