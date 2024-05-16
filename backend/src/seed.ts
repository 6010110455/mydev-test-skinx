import { AppDataSource } from './data-source';
import { Post } from './entity/Post';
import * as fs from 'fs';

async function seed() {
  await AppDataSource.initialize();

  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  for (const postData of data) {
    const post = new Post();
    post.title = postData.title;
    post.content = postData.content;
    post.postedAt = new Date(postData.postedAt);
    post.postedBy = postData.postedBy;
    post.tags = postData.tags;

    await AppDataSource.manager.save(post);
  }

  console.log('Seeding completed');
}

seed().catch(error => console.log(error));
