import React from "react";
import { Card, CardHeader, Col, Divider, List, ListItem, Rating, Row, Text } from 'sha-el-design';
import { TimeAgo } from '../comon/TimeAgo';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { Review } from './../typings';

interface Props {
  review: Review[];
  loadMore: () => void;
  showLoadMore: boolean;
}

export const HomePage: React.FC<Props> = (props) => {

  const calculatePercentage = (value?: number, total?: number) => {
    if (!value || !total) {
      return 0;
    }
  
    return (value * 100) / total;
  };

  return (
    <Card elevation={0}>
      <CardHeader style={{ marginBottom: '5px' }}>Latest Reviews</CardHeader>
      <Divider />
      <List elevation={0}>
        {props.review.map((v) => (
          <ListItem
            padding={[10, 20]}
            key={v.id}
            avatar={<img alt="product" style={{ height: '162px', width: '162px' }} src={v.webHookEventPayload?.product.image} />}
            action={<Rating value={v.starRating} totalCount={5} editable={false} color="#fbc756" size={15} />}
            style={{ alignItems: 'flex-start' }}
          >
            <Text variant="p">
              <Text fontWeight="bold">{v.webHookEventPayload?.user.name || v.webHookEventPayload?.user.firstName || v.email}</Text>
              <Text margin="5px">Reviewed</Text>
              <Text>{v.webHookEventPayload?.product.name}</Text>
            </Text>
            <Text fontWeight="bold" variant="p">
              {v.title}
            </Text>
            <Text variant="p">
              {v.comment}
            </Text>
            <Row gutter={[5, 5]} alignItems="center">
              <Col flex="0 1 auto">
                <Text variant="p" color="light">
                  <TimeAgo>{v.date}</TimeAgo>
                </Text>
              </Col>
              <Col flex="0 1 auto">
                <AiFillLike fill="#00E676" />
              </Col>
              <Col flex="0 1 auto">{v?.totalLikes}</Col>
              <Col flex="0 1 auto">
                <AiFillDislike fill="#E65100" />
              </Col>
              <Col flex="0 1 auto">{v?.totalDislikes}</Col>
              <Col flex="0 1 auto">
                <Text color="light">
                  {calculatePercentage(v?.totalLikes, (v?.totalLikes || 0) + (v?.totalDislikes || 0))}%
                  of people find this useful
                </Text>
              </Col>
            </Row>
          </ListItem>
        ))}
      </List>
      {props.showLoadMore && <Text onClick={props.loadMore} style={{ cursor: 'pointer' }} color="primary" variant="p" textAlign="center">
        Load More
      </Text>}
    </Card>
  );
}