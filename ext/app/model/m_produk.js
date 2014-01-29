Ext.define('YMPI.model.m_produk', {
	extend: 'Ext.data.Model',
	alias		: 'widget.produkModel',
	fields		: [
		{name: 'produk_id', type: 'int', mapping: 'produk_id'},
		{name: 'produk_nama', type: 'string', mapping: 'produk_nama'},
		{name: 'produk_kode', type: 'string', mapping: 'produk_kode'},
		{name: 'produk_harga', type: 'int', mapping: 'produk_harga'},
		{name: 'produk_satuan', type: 'int', mapping: 'produk_satuan'},
		{name: 'produk_keterangan', type: 'string', mapping: 'produk_keterangan'},
		{name: 'produk_aktif', type: 'string', mapping: 'produk_aktif'},
		{name: 'produk_creator', type: 'string', mapping: 'produk_creator'},
		{name: 'produk_date_create', type: 'date', dateFormat: 'Y-m-d H:i:s', mapping: 'produk_date_create'},
		{name: 'produk_update', type: 'string', mapping: 'produk_update'},
		{name: 'produk_date_update', type: 'date', dateFormat: 'Y-m-d H:i:s', mapping: 'produk_date_update'},
		{name: 'produk_revised', type: 'int', mapping: 'produk_revised'},
		{name: 'produk_bpom', type: 'string', mapping: 'produk_bpom'}
		],
	idProperty	: 'produk_id'	
});