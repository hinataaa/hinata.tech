import _ from 'lodash'
import { makePost, makeDownload, makePostSpecial } from '@/utils/request'
import URLS from '@/constants/URLS'

export const getData = (body, rSymbol) => makePost(URLS.GET_DATA, body, rSymbol)


