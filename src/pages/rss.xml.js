import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "air2.earth",
    description: "the informal blog space companion from mmatt.net",
    site: "https://air2.earth",
    items: posts.map((post) => ({
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
    })),
  });
}
