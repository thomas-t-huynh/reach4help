import * as functions from 'firebase-functions';
import { MARKERS } from './markers';

import { db } from '../../../app';

import { MARKER_COLLECTION_ID, MarkerInfo } from '../../../models/markers';
import { FieldPath } from '@google-cloud/firestore';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const dataImport = functions.https.onRequest(async (_req, res) => {
  const markers = await db
    .collection(MARKER_COLLECTION_ID)
    .where(new FieldPath('visible'), '==', true)
    .get();
  const existingMarkers = new Set<string>();
  markers.forEach(doc => {
    const docData = doc.data() as MarkerInfo;
    if (docData.source?.name === 'hardcoded') {
      existingMarkers.add(docData.source.id);
    }
  });
  const collection = db.collection(MARKER_COLLECTION_ID);
  for (let i = 0; i < MARKERS.length; i++) {
    const marker = { ...MARKERS[i] };
    const id = `${i}`;
    if (!existingMarkers.has(id)) {
      marker.source = { name: 'hardcoded', id };
      if (!marker.contentBody) {
        delete marker.contentBody;
      }
      // eslint-disable-next-line no-await-in-loop
      await collection.add(marker);
    }
  }
  res.send('Done');
});
