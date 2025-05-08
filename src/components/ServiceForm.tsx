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
  
        if (!uploadRes.ok) throw new Error('Ошибка при загрузке изображения');
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
        throw new Error(`Ошибка сервера: ${res.status} ${errorText}`);
      }
  
      alert('✅ Услуга опубликована!');
      setTitle('');
      setCategory('design');
      setDescription('');
      setReward('');
      setTags('');
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      console.error(err);
      alert('❌ Ошибка: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>🛠️ Опубликовать услугу</h2>

      <input
        type="text"
        placeholder="Название услуги"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.input}
      >
        <option value="design">🎨 Дизайн</option>
        <option value="development">💻 Разработка</option>
        <option value="writing">✍️ Копирайтинг</option>
        <option value="marketing">📢 Маркетинг</option>
      </select>

      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
        rows={4}
        required
      />

      <input
        type="number"
        placeholder="Вознаграждение ($SKILL)"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        className={styles.input}
        required
      />

      <input
        type="text"
        placeholder="Теги (через запятую)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className={styles.input}
      />
      <label className={styles.label}>Изображение услуги:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {imagePreview && (
        <img src={imagePreview} alt="Предпросмотр" className={styles.preview} />
      )}

      <button type="submit" className={styles.button}>
        🚀 Опубликовать
      </button>
    </form>
  );
}