import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "master", // your Git branch
  clientId: "99c5b6c2-a688-4f47-8a8b-8337bc8b95ef", // ✅ no quotes here
  token: "0121c328c3cc948dc6b3889403070518ad55ca73", // used for local development only
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "public/uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        ui: {
          filename: {
            slugify: (values) => {
              // filename based on title
              return (
                values?.title
                  ?.toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)+/g, "") || "new-post"
                  .trim()
              );
            },
          },

          beforeSubmit: async ({ form, values }) => {
            return {
              ...values,
              slug: values.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "") || "new-post"
                .trim(),
            };

          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "image",
            name: "featureImage",
            label: "Feature Image",
            description: "Upload or select the main image for this post",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            description: "Name of the post author",
            ui: {
              defaultValue: "John Doe", // ✅ default author name
            },
          },
          {
            type: "string",
            list: true, // ✅ enables multiple tags
            name: "tags",
            label: "Tags",
            description: "Add one or more tags for this post",
            ui: {
              component: "tags", // shows nice tag UI in TinaCMS
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
            ui: {
              component: null, // or leave out to show in the UI
            },
          },

        ],
      },
    ],
  },
});