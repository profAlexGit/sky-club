import DS from 'ember-data';
// import JSONAPISerializer from '@ember-data/serializer/json';

// export default class ApplicationSerializer extends DS.JSONSerializer {
// 	normalizeResponse(store, primaryModelClass, payload, id, requestType) {}
// }

export default class ApplicationSerializer extends DS.JSONSerializer {
	normalizeFindRecordResponse(store, type, payload) {
		return super.normalizeFindRecordResponse(...arguments);
	}
}
