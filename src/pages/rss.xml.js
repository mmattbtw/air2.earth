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
    site: context.site,
    items: posts.map((post) => ({
      link: `/blog/${post.slug}/`,
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
  });
}
