Ext.define('YMPI.view.MASTER.v_produk', {
	extend: 'Ext.grid.Panel',
	requires: ['YMPI.store.s_produk'],
	
	title		: 'produk',
	itemId		: 'Listproduk',
	alias       : 'widget.Listproduk',
	store 		: 's_produk',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'produk_id',
				hidden : true,
				dataIndex: 'produk_id'
			},{
				header: 'Produk Nama',
				dataIndex: 'produk_nama'
			},{
				header: 'Produk Kode',
				dataIndex: 'produk_kode'
			},{
				header: 'Produk Harga',
				dataIndex: 'produk_harga'
			},{
				header: 'Produk Satuan',
				dataIndex: 'produk_satuan'
			},{
				header: 'Produk Keterangan',
				dataIndex: 'produk_keterangan'
			},
			{
				header: 'produk_aktif',
				dataIndex: 'produk_aktif'
			},{
				header: 'produk_creator',
				dataIndex: 'produk_creator'
			},{
				header: 'produk_date_create',
				dataIndex: 'produk_date_create',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'produk_update',
				dataIndex: 'produk_update'
			},{
				header: 'produk_date_update',
				dataIndex: 'produk_date_update',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},
			{
				header: 'produk_bataler',
				dataIndex: 'produk_bataler'
			},
			{
				header: 'BPOM',
				dataIndex: 'produk_bpom'
			}];
		this.dockedItems = [
			Ext.create('Ext.toolbar.Toolbar', {
				items: [{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'button',
					items: [{
						text	: 'Add',
						iconCls	: 'icon-add',
						action	: 'create'
					}, {
						xtype: 'splitter'
					}, {
						itemId	: 'btndelete',
						text	: 'Delete',
						iconCls	: 'icon-remove',
						action	: 'delete',
						disabled: true
					}]
				}, '-', {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'button',
					items: [{
						text	: 'Export Excel',
						iconCls	: 'icon-excel',
						action	: 'xexcel'
					}, {
						xtype: 'splitter'
					}, {
						text	: 'Export PDF',
						iconCls	: 'icon-pdf',
						action	: 'xpdf'
					}, {
						xtype: 'splitter'
					}, {
						text	: 'Cetak',
						iconCls	: 'icon-print',
						action	: 'print'
					}]
				}]
			}),
			{
				xtype: 'pagingtoolbar',
				store: 's_produk',
				dock: 'bottom',
				displayInfo: true
			}
		];
		this.callParent(arguments);
		
		this.on('itemclick', this.gridSelection);
		this.getView().on('refresh', this.refreshSelection, this);
	},	
	
	gridSelection: function(me, record, item, index, e, eOpts){
		//me.getSelectionModel().select(index);
		this.selectedIndex = index;
		this.getView().saveScrollState();
	},
	
	refreshSelection: function() {
        this.getSelectionModel().select(this.selectedIndex);   /*Ext.defer(this.setScrollTop, 30, this, [this.getView().scrollState.top]);*/
    }

});