<template>
  <section class="content">
    <div class="row center-block">
      <!--
      <h2>名單列表</h2>
      -->
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
              <!--
            <h3 class="box-title">List</h3>
              -->
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12">
                  <table id="managerData" class="table table-bordered table-striped">
                    <thead>
                      <tr role="row">
                        <th colspan="1" rowspan="1" tabindex="0" class="sorting_asc">編號</th>
                        <th aria-label="Browser: activate to sort column ascending" style="width: 207px;" colspan="1" rowspan="1" tabindex="0" class="sorting">品名</th>
                        <th tabindex="0" class="sorting">價格</th>
                        <th tabindex="0" class="sorting">點數</th>
                        <th tabindex="0" class="sorting">狀態</th>
                        <th tabindex="0" class="sorting"></th>
                        <th tabindex="0" class="sorting"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="row in rowData" >
                        <td class="sorting_1">{{row.id}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.price}}</td>
                        <td>{{row.point}}</td>
                        <td>
                          <span class="fa fa-check-square-o" v-if="row.s_states==1"></span>
                          <span class="fa fa-close" v-else> 停用中</span>
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm btn-success">編輯</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm btn-default">刪除</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'

// Require needed datatables modules
require('datatables.net')
require('datatables.net-bs')

export default {
  name: 'managers',
  data () {
    return {
      rowData: [],
      currentPage: 0,
      itemsPerPage: 1,
      resultCount: 0,
      apiurl: this.$store.state.apiurl,
      token: this.$store.state.token
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.$http.get(this.apiurl + '/product', {params: {token: this.token}}).then(function (res) {
        // console.log(res.body.data)
        this.rowData = res.body.data
        this.$nextTick(function () {
          $('#managerData').dataTable({
            destroy: true,
            language: {
              url: './static/config/dataTable.json'
            }
          })
        })
      }, function () {
        console.log('failed')
      })
    }
  }
}
</script>

<style>
@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>
