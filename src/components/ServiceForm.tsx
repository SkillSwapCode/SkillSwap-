'use client';

import { useState } from 'react';
import styles from '@/styles/ServiceForm.module.css';

export default function ServiceForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('design');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData = {
      title,
      category,
      description,
      price: Number(reward),
      tags: tags.split(',').map((tag) => tag.trim()),
      date: new Date().toLocaleDateString(),
      backgroundImage: '',
    };

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadResult = await uploadRes.json();
        serviceData.backgroundImage = uploadResult.url;
      }

      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} ${errorText}`);
      }

      alert('Service published successfully!');
      setTitle('');
      setCategory('design');
      setDescription('');
      setReward('');
      setTags('');
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      console.error(err);
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Publish Your Service</h2>

      <input
        type="text"
        placeholder="Service title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.select}
      >
        <option value="design">Design</option>
        <option value="development">Development</option>
        <option value="writing">Copywriting</option>
        <option value="marketing">Marketing</option>
      </select>

      <textarea
        placeholder="Service description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
        rows={4}
        required
      />

      <input
        type="number"
        placeholder="Reward (in $SKILL)"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        className={styles.input}
        required
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className={styles.input}
      />

      <label className={styles.label}>Cover image:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {imagePreview && (
        <img src={imagePreview} alt="Preview" className={styles.preview} />
      )}

      <button type="submit" className={styles.button}>
        Publish
      </button>
    </form>
  );
}
