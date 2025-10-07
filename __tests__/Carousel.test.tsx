import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Carousel, CarouselItem } from '@/components/Carousel';

describe('Carousel', () => {
  test('renders first slide initially', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>
    );
    expect(screen.getByText('Slide 1')).toBeVisible();
  });

  test('navigates to next and previous slides', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );
    const next = screen.getByLabelText('Next slide');
    const prev = screen.getByLabelText('Previous slide');
    fireEvent.click(next);
    expect(screen.getByText('Slide 2')).toBeVisible();
    fireEvent.click(prev);
    expect(screen.getByText('Slide 1')).toBeVisible();
  });

  test('wraps around from last to first', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );
    const next = screen.getByLabelText('Next slide');
    fireEvent.click(next);
    fireEvent.click(next);
    expect(screen.getByText('Slide 1')).toBeVisible();
  });

  test('auto-rotates with interval and pauses on hover', async () => {
    jest.useFakeTimers();
    render(
      <Carousel autoPlay interval={1000}>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );
    expect(screen.getByText('Slide 1')).toBeVisible();
    jest.advanceTimersByTime(1000);
    await waitFor(() => expect(screen.getByText('Slide 2')).toBeVisible());
    const region = screen.getByRole('region');
    fireEvent.mouseEnter(region);
    jest.advanceTimersByTime(3000);
    expect(screen.getByText('Slide 2')).toBeVisible();
    jest.useRealTimers();
  });
});

