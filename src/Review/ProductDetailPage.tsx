import React from 'react';
import { Button, Card, CardHeader, Col, Divider, Popover, Rating, Row, Text } from 'sha-el-design';
import { Review } from '../typings';
import { TimeAgo } from '../comon/TimeAgo';
import { MdAccountCircle } from 'react-icons/md';

export const ProductDetailPage: React.FC<Props> = (props: Props) => {
  return (
    <Card>
        <Row style={{ padding: 0 }}>
          <Col span={16} spanLg={16} spanMd={14} spanXl={16} spanSm={24} spanXs={24}>
            <CardHeader
              subtitle={
                <Button flat link primary style={{ textDecoration: 'underline' }} href={`app.idukki.io/${props.review[0].businessId}/${props.review[0].productId}`}>
                  Write a review
                </Button>
              }
            >
              Customer Reviews
            </CardHeader>
          </Col>
          <Col span={8} spanLg={8} spanMd={10} spanSm={24} spanXs={24} spanXl={8}>
            <Row gutter={20} justifyContent="flex-end" alignItems="center">
              <Col flex="0">
                <Text variant="h1" fontWeight="400">
                  {props.review[0]?.averageReviewOfThisProduct || 0}
                </Text>
              </Col>
              <Col flex="0">
                <Rating totalCount={5} value={4.9} disabled color="rgba(251, 199, 86, 1)" size={15} />
                <Text style={{ margin: '5px' }} variant="p">
                  {props.review[0]?.totalReviewForThisProduct || 0} Reviews
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[30, 10]} style={{ paddingTop: '20px' }}>
          <>
            {props.review.map((item, index) => (
              <Col key={index} span={12} spanLg={12} spanMd={24} spanSm={24} spanXl={12} spanXs={24}>
                <Row gutter={[10, 10]} alignItems="center">
                  <Col span={16} spanLg={16} spanMd={16} spanSm={14} spanXl={16} spanXs={14}>
                    <Rating color="#fbc756" value={item?.starRating || 0} size={10} editable={false} totalCount={5} />
                  </Col>
                  <Col span={8} spanLg={8} spanMd={8} spanSm={6} spanXs={8} spanXl={8}>
                    <Text variant="p" fontSize="11px" color="gray">
                      <TimeAgo>{item?.createdAt}</TimeAgo>
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text variant="h5" fontWeight="bold">
                      {item?.title}
                    </Text>
                  </Col>
                  <Col>
                    <Text variant="p" color="grey">
                      {(item?.comment?.length || 0) > 100 ? (
                        <>
                          <Text margin="0" variant="p" color="light">
                            {item?.comment?.slice(0, 100) + '...'}
                          </Text>
                          <Popover style={{ width: '300px' }} overlay={item?.comment}>
                            <div>
                              <Text style={{ cursor: 'pointer' }} color="blue">
                                Read more
                              </Text>
                            </div>
                          </Popover>
                        </>
                      ) : (
                        <Text margin="0" variant="p" color="light">
                          {item?.comment}
                        </Text>
                      )}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text>
                      Product:{' '}
                      <Button link primary style={{ textDecoration: 'underline' }} flat>
                        {item.productId}
                      </Button>
                    </Text>
                  </Col>
                </Row>
                <Row gutter={[10, 10]} style={{ paddingTop: '10px' }} alignItems="center">
                  <Col span={4} spanLg={4} spanXl={4} spanMd={3} spanSm={6} spanXs={6}>
                    {item?.webHookEventPayload?.user.image ? (
                      <img
                        style={{ borderRadius: '5px' }}
                        width="50px"
                        src={item?.webHookEventPayload?.user.image}
                      />
                    ) : (
                      <MdAccountCircle color="grey" size={70} />
                    )}
                  </Col>
                  <Col span={16} spanLg={16} spanXl={16} spanMd={16} spanSm={12} spanXs={12}>
                    <Text variant="h6" fontWeight="bold">
                      {item.name}
                    </Text>
                    <Text variant="p" fontSize="8" color="gray" style={{ margin: '5px 5px 5px 0' }}>
                      {item.countryCode}
                    </Text>
                  </Col>
                </Row>
              </Col>
            ))}
          </>
        </Row>
      </Card>
  );
};
interface Props {
  review: Review[];
}
