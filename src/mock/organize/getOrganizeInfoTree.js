import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/organize'

/**
 * @descrption 模拟接口 - 获取组织Tree列表
 */
Mock.mock(Utils.toRegex(api.getOrganizeInfoTree), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  let result = null
  switch (body && body.param && body.param.orgId) {
    case '0': {
      result = Utils.builder([
        {
          isLeaf: false,
          isOrg: 'Y',
          key: '1',
          orgShortName: '集团公司',
          title: '浙大远疆投资集团有限公司'
        }
      ])
      break
    }
    case '1': {
      result = Utils.builder([
        {
          isLeaf: false,
          isOrg: 'Y',
          key: '101.100',
          orgShortName: '港运公司',
          title: '港运信息有限公司'
        }
      ])
      break
    }
    case '101.100': {
      result = Utils.builder([
        {
          isLeaf: true,
          isOrg: 'Y',
          key: '101.100.131',
          orgShortName: '北仑网安',
          title: '北仑网安通信有限公司'
        },
        {
          isLeaf: true,
          isOrg: 'Y',
          key: '101.100.138',
          orgShortName: '宁财港务',
          title: '宁财港务有限公司'
        }
      ])
      break
    }
    default: {
      result = Utils.builder([])
    }
  }

  // 输出日志
  log('\n\n--- 接口参数 - 获取组织Tree列表 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取组织Tree列表 ---------')
  log(result)

  // 返回结果
  return result
})
