import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable, Transform } from 'stream';

async function* generateMassiveDataset(count) {
  for (let i = 1; i <= count; i++) {
    yield {
      id: i,
      value: Math.random() * 100,
      timestamp: new Date().toISOString(),
      metadata: "some-heavy-string-data-to-simulate-load".repeat(10)
    };
  }
}

class ProcessStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(record, _, callback) {
    if (record.value > 50) {
      const processed = {
        uid: `processed_${record.id}`,
        result: record.value.toFixed(2),
        category: record.value > 80 ? 'CRITICAL' : 'NORMAL',
        processedAt: new Date().toISOString()
      };
      this.push(JSON.stringify(processed) + '\n');
    }
    callback();
  }
}

async function runSystem() {
  const OUTPUT_FILE = 'proc_data.ndjson';
  const RECORD_COUNT = 1_000_000;

  console.log(`[Start] Initializing processing for ${RECORD_COUNT} records...`);
  const startTime = Date.now();

  try {
    const source = Readable.from(generateMassiveDataset(RECORD_COUNT), { objectMode: true });

    await pipeline(
      source,
      new ProcessStream(),
      createWriteStream(OUTPUT_FILE)
    );

    const duration = (Date.now() - startTime) / 1000;
    const stats = process.memoryUsage();

    console.log('-------------------------------------------');
    console.log(`[Success] Processing complete in ${duration}s`);
    console.log(`[File] Results saved to: ${OUTPUT_FILE}`);
    console.log(`[Memory Check] Heap Used: ${(stats.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log('-------------------------------------------');

  } catch (err) {
    console.error('[Critical Error] Pipeline failed:', err);
    process.exit(1);
  }
}

runSystem();
