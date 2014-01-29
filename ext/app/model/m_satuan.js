Ext.define('YMPI.model.m_satuan', {
	extend: 'Ext.data.Model',
	alias		: 'widget.satuanModel',
	fields		: ['satuan_id','satuan_kode','satuan_nama','satuan_aktif','satuan_creator'],
	idProperty	: 'satuan_id'	
});