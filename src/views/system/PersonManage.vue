<template>
  <section class="section-container">
    <div
      class="section-left-container"
      :style="{ width: collapse ? '0' : '334px' }"
    >
      <div class="section-left-tree">
        <organize-tree
          ref="tree"
          :queryOptions="queryOptions"
          @selectedNode="doSelectedNode"
          @queryTable="doTableQuery"
        />
      </div>
    </div>
    <div class="section-right-container">
      <a-card
        style="
          display: flex;
          flex-flow: column nowrap;
          flex: 1 1 auto;
          width: 100%;
          height: 100%;
          overflow: hidden;
        "
        :bodyStyle="{
          display: 'flex',
          flexFlow: 'column nowrap',
          flex: '1 1 auto',
          padding: '16px 24px 24px',
          overflow: 'hidden',
          position: 'relative',
        }"
        :headStyle="{ flex: '0 0 auto', overflow: 'hidden' }"
        :bordered="false"
      >
        <div class="section-query-container">
          <person-query
            ref="query"
            @add="doTableAdd"
            @query="doTableQuery"
          />
        </div>
        <div class="section-table-container">
          <person-table
            ref="table"
            :queryOptions="queryOptions"
            :selectedNode="selectedNode"
            :pagination="pagination"
          />
        </div>
      </a-card>
      <div class="section-pagination-container">
        <a-pagination
          v-bind="pagination"
          v-model="pagination.current"
          :pageSize.sync="pagination.pageSize"
          :pageSizeOptions="pagination.pageSizeOptions"
          @showSizeChange="doPageChange({ ...pagination, current: 1 })"
          @change="doPageChange({ ...pagination })"
        />
      </div>
      <a-button
        type="link"
        class="section-tree-collapse"
        :icon="collapse ? 'double-right' : 'double-left'"
        @click.stop="collapse = !collapse"
      />
    </div>
  </section>
</template>

<script>
import * as baseApi from '@/api/base'

import OrganizeTree from './components/PersonManage/OrganizeTree'
import PersonQuery from './components/PersonManage/PersonQuery'
import PersonTable from './components/PersonManage/PersonTable'

export default {
  name: 'PersonManage',
  components: {
    OrganizeTree,
    PersonQuery,
    PersonTable
  },
  data () {
    return {
      // ?????????
      queryOptions: {
        orgTree: [],
        departmentSysId: []
      },

      // ??????????????????
      selectedNode: {},

      // ????????????
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        pageSizeOptions: ['10', '20', '25', '30', '50', '100', '200'],
        showTotal: (total, range) => `??? ${range[0]}-${range[1]} ??? (??? ${total} ???)`,
        hideOnSinglePage: false,
        showSizeChanger: true,
        showLessItems: true
      },

      // ??????
      collapse: false
    }
  },
  mounted () {
    this.doOptionsQuery()
    this.doTreeQuery()
  },
  methods: {
    /**
     * @description ???????????????
     * @returns {undefined}
     */
    doOptionsQuery () {
      // ??????
      baseApi.getTreeById({ id: 'orgTree' }).then(res => {
        if (res.code !== '0000') {
          return Promise.reject(new Error(res))
        }
        this.queryOptions.orgTree.splice(0)
        this.queryOptions.orgTree.push(...res.result)
      })

      // ??????
      baseApi.getOptionById({ id: 'dept', sqlParams: { orgId: '', isAll: '1' } }).then(res => {
        if (res.code !== '0000') {
          return Promise.reject(new Error(res))
        }
        this.queryOptions.departmentSysId.splice(0)
        this.queryOptions.departmentSysId.push(...res.result)
      })
    },

    /**
     * @description ???????????????
     * @returns {undefined}
     */
    doTreeQuery () {
      this.$refs.tree.doRefresh()
    },

    /**
     * @description ??????????????????
     * @returns {undefined}
     */
    doTableAdd () {
      this.$refs.table.doDrawerAdd()
    },

    /**
     * @description ??????????????????
     * @param {Object} options
     * @returns {undefined}
     */
    doTableQuery (options) {
      Object.assign(this.$refs.table.queryParam, options)
      if (this.$refs.table.queryParam.orgId || this.$refs.table.queryParam.departmentSysId) {
        this.$refs.table.doTableQuery()
      }
    },

    /**
     * @description ??????????????????
     * @param {Object} options
     * @returns {undefined}
     */
    doPageChange (options) {
      this.$refs.table.doPageQuery(options)
    },

    /**
     * @description ??????????????????
     * @param {Object} options
     * @returns {undefined}
     */
    doSelectedNode (options) {
      this.selectedNode = options
    }
  }
}
</script>

<style lang="less" scoped>
.section-container {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: calc(100% - 40px);
  padding: 24px 24px 12px;
  position: absolute;
  .section-left-container {
    flex: 0 0 auto;
    width: 334px;
    height: 100%;
    overflow: hidden;
    transition: width 0.25s ease;
    .section-left-tree {
      width: 310px;
      height: 100%;
    }
  }
  .section-right-container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    width: calc(100% - 334px);
    height: 100%;
    position: relative;
    .section-query-container {
      flex: 0 0 auto;
      width: 100%;
      margin-bottom: 12px;
    }
    .section-table-container {
      flex: 1 1 auto;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .section-pagination-container {
      flex: 0 0 auto;
      width: 100%;
      height: auto;
      text-align: right;

      :deep(.ant-pagination) {
        margin: 10px 0 0;
      }
    }
    .section-tree-collapse {
      font-size: 18px;
      margin: -30px 0 0 12px;
      border: none;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 0;
      cursor: pointer;
    }
  }
}
</style>
