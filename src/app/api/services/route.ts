import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'services.json');

export async function POST(request: Request) {
  try {
    const newService = await request.json();
    newService.id = crypto.randomUUID();

    let services = [];
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      services = JSON.parse(data);
      if (!Array.isArray(services)) throw new Error('Invalid JSON format');
    } catch (readError: any) {
      if (readError.code === 'ENOENT') {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        services = [];
      } else {
        throw readError;
      }
    }
    console.log(newService);
    
    services.push(newService);

    await fs.writeFile(filePath, JSON.stringify(services, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Услуга сохранена', success: true });
  } catch (error) {
    console.error('Ошибка при сохранении:', error);
    return NextResponse.json({ error: 'Ошибка при записи' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const services = JSON.parse(data);
    return NextResponse.json(services);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    return NextResponse.json({ error: 'Ошибка при чтении' }, { status: 500 });
  }
}