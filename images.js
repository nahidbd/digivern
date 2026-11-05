/* Digivern images for news items, keyed by news id. One entry per line.
   The daily update ADDS requests; the "Process images" GitHub Actions job turns them into images and fills in the rest.

   Request (written by the daily update):
     "n52":{"status":"requested","alt":"What the image shows, for screen readers","commons":"File:Exact file name on Wikimedia Commons.jpg","prompt":"Scene to draw if no usable photo","noAi":false}
     - commons: a Wikimedia Commons file that shows a place, building, infrastructure, technology or sector scene relevant to the story.
       Never a photo whose subject is a public figure or an identifiable person. The job checks the licence itself and only accepts
       public domain, CC0, CC BY or CC BY-SA files with no extra restrictions.
     - prompt: used for an AI-generated illustration only if there is no usable photo. No real people, no logos, no text, no flags or emblems.
     - noAi: true for elections, conflict, disasters, crime, health emergencies or any story where an illustration could mislead
       (then the item simply has no image if no photo is usable).

   Result (written by the job): status "done" with src (img/<id>.webp), w, h, kind ("photo" | "ai"), credit, license, licenseUrl, sourceUrl;
   or status "failed" with a reason. The site shows only "done" entries. */
window.DV_IMAGES = {
};
