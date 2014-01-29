<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Class	: M_produk
 * 
 * Table	: produk
 *  
 * @author GIOV
 *
 */
class M_produk extends CI_Model{

	function __construct(){
		parent::__construct();
	}
	
	/**
	 * Fungsi	: getAll
	 * 
	 * Untuk mengambil all-data
	 * 
	 * @param number $start
	 * @param number $page
	 * @param number $limit
	 * @return json
	 */
	function getAll($start, $page, $limit, $query){
		//$query  = $this->db->limit($limit, $start)->order_by('produk_id', 'ASC')->get('produk')->result();
		$select		= "SELECT produk.*";
		$selecttotal= "SELECT COUNT(*) AS total";
		$from		= " FROM produk";
		$orderby	= " ORDER BY produk_id";
		$limit		= " LIMIT ".$start.",".$limit;
		
		/* For simple search */
		if ($query<>""){
			$from .= preg_match("/WHERE/i",$from)? " OR ":" WHERE ";
			$from .= "(";
			if(is_numeric($query)){
				$from .= " produk.produk_id = ".addslashes(strtolower($query))." AND";
			}else{
				$from .= " lower(produk.produk_nama) LIKE '%".addslashes(strtolower($query))."%' OR";
			}
			//$from = substr($from,0,strlen($from) -2);
			$from = substr($from, 0, strrpos($from, ' '));
			$from .= ")";
		}
		
		$sql 		= $select.$from.$orderby.$limit;
		$sqltotal 	= $selecttotal.$from;
		
		$result  = $this->db->query($sql)->result();
		$rstotal = $this->db->query($sqltotal)->row();
		$total  = (sizeof($rstotal) == 0 ? 0 : $rstotal->total);
		
		$data   = array();
		foreach($result as $row){
			$data[] = $row;
		}
		
		$json	= array(
						'success'   => TRUE,
						'message'   => "Loaded data",
						'total'     => $total,
						'data'      => $data
		);
		
		return $json;
	}
	
	/**
	 * Fungsi	: save
	 * 
	 * Untuk menambah data baru atau mengubah data lama
	 * 
	 * @param array $data
	 * @return json
	 */
	function save($data){
		$last   = NULL;
		
		$pkey = array('produk_id'=>$data->produk_id);
		
		if($this->db->get_where('produk', $pkey)->num_rows() > 0){
			/*
			 * Data Exist
			 */			 
			 
			$arrdatau = array(
				'produk_nama'=>$data->produk_nama,
				'produk_kode'=>$data->produk_kode,
				'produk_harga'=>$data->produk_harga,
				'produk_satuan'=>$data->produk_satuan,
				'produk_keterangan'=>$data->produk_keterangan,
				'produk_aktif'=>$data->produk_aktif,
				'produk_creator'=>$data->produk_creator,
				'produk_date_create'=>(strlen(trim($data->produk_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->produk_date_create)) : NULL),
				'produk_update'=>$data->produk_update,
				'produk_date_update'=>(strlen(trim($data->produk_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->produk_date_update)) : NULL),
				'produk_revised'=>$data->produk_revised,
				'produk_bpom'=>$data->produk_bpom
				);
			 
			$this->db->where($pkey)->update('produk', $arrdatau);
			$last   = $data;
			
		}else{
			/*
			 * Data Not Exist
			 * 
			 * Process Insert
			 */
			 
			$arrdatac = array(
				'produk_id'=>$data->produk_id,
				'produk_nama'=>$data->produk_nama,
				'produk_kode'=>$data->produk_kode,
				'produk_harga'=>$data->produk_harga,
				'produk_satuan'=>$data->produk_satuan,
				'produk_keterangan'=>$data->produk_keterangan,
				'produk_aktif'=>$data->produk_aktif,
				'produk_creator'=>$data->produk_creator,
				'produk_date_create'=>(strlen(trim($data->produk_date_create)) > 0 ? date('Y-m-d H:i:s', strtotime($data->produk_date_create)) : NULL),
				'produk_update'=>$data->produk_update,
				'produk_date_update'=>(strlen(trim($data->produk_date_update)) > 0 ? date('Y-m-d H:i:s', strtotime($data->produk_date_update)) : NULL),
				'produk_revised'=>$data->produk_revised,
				'produk_bpom'=>$data->produk_bpom
				);
			 
			$this->db->insert('produk', $arrdatac);
			$last   = $this->db->where($pkey)->get('produk')->row();
			
		}
		
		$total  = $this->db->get('produk')->num_rows();
		
		$json   = array(
						"success"   => TRUE,
						"message"   => 'Data berhasil disimpan',
						'total'     => $total,
						"data"      => $last
		);
		
		return $json;
	}
	
	/**
	 * Fungsi	: delete
	 * 
	 * Untuk menghapus satu data
	 * 
	 * @param array $data
	 * @return json
	 */
	function delete($data){
		$pkey = array('produk_id'=>$data->produk_id);
		
		$this->db->where($pkey)->delete('produk');
		
		$total  = $this->db->get('produk')->num_rows();
		$last = $this->db->get('produk')->result();
		
		$json   = array(
						"success"   => TRUE,
						"message"   => 'Data berhasil dihapus',
						'total'     => $total,
						"data"      => $last
		);				
		return $json;
	}
}
?>