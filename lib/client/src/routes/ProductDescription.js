import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Styles } from '../styles';
import { withRouter } from 'react-router-dom';
import MarkdownEditor from '../containers/MarkdownEditor';
import { Tags } from '../tags';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from '../utils/verifyUser';
import ProductItem from '../components/ProductItem';
import ButtonLoader from '../components/loaders/ButtonLoader';
const { Common, Product } = Styles;

const options = [
  'source',
  '|',
  'bold',
  'strikethrough',
  'underline',
  'italic',
  '|',
  'ul',
  'ol',
  '|',
  'outdent',
  'indent',
  '|',
  'fontsize',
  'paragraph',
  '|',
  'image',
  'video',
  'table',
  'link',
  '|',
  'align',
  'undo',
  'redo',
]

const ProductDescription = ({ history, location: { search }, match: { params: { storeName } } }) => {
  const values = queryString.parse(search);
	const [ content, setContent ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const [ saved, setSaved ] = useState(false)

  const [ updateDescription ] = useMutation(Tags.Product.Mutations.updateDescription);

  const { loading: productLoading, data: productData } = useQuery(Tags.Product.Queries.getProduct,
    { variables: { id: values.id } }
  );

  useEffect(() => {
    if (search.id == '') {
      history.push('/')
    };
    if (!productLoading) {
      const product = productData.getProduct;
      if (product.description) {
        setContent(product.description);
      } else {
        setContent('');
      }
    }
  }, [ productData ]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Common.Headers.Page>Description</Common.Headers.Page>

      <Common.Presentation>
        {
          !productLoading && (
            <Common.Description>{productData.getProduct.title}</Common.Description>
          )
        }

        <MarkdownEditor
          options={options}
          content={content}
          setContent={setContent}
        />
        <br />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ color: 'green', opacity: saved ? '1' : '0', transition: '0.3s linear', padding: '0px 10px' }}>
            <Common.Icons.Default style={{ paddingLeft: 0, paddingRight: 5, color: 'green' }} icon={faCheck} /> Saved
          </p>

          <div>
            <Common.Buttons.Cancel
              onClick={() => history.push('/')}
              gradient={true}
              width="190px"
              style={{ marginRight: 15 }}
            >
              Cancel
            </Common.Buttons.Cancel>
            <Common.Buttons.Eco
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                const res = await updateDescription({ variables: { id: values.id, description: content } })
                if (res.data.updateDescription) {
                  setLoading(false);
                  setSaved(true);
                  history.push(`/${storeName}/product/${values.id}`)
                }
              }}
              gradient={true}
              width="190px"
            >
              <ButtonLoader
                loading={loading}
                placeholder={values.editState == 'true' ? 'Update Product' : 'Create Product'}
                color='primary'
              />
            </Common.Buttons.Eco>
          </div>
        </div>

      </Common.Presentation>
    </div>
  )
}

export default withRouter(ProductDescription);
