import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageUploadField } from './ImageUploadField';
import * as imagekitModule from '../../services/imagekitService';

describe('ImageUploadField Component Tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders upload field with label and placeholder', () => {
    render(
      <ImageUploadField
        label="Project Screenshot"
        value=""
        onChange={jest.fn()}
        placeholder="Custom placeholder..."
      />
    );

    expect(screen.getByText('Project Screenshot')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Custom placeholder...')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  test('handles successful file selection and calls onChange with ImageKit URL', async () => {
    const mockOnChange = jest.fn();
    const targetUrl = 'https://ik.imagekit.io/x2eerczu0/hero/photo.png';

    jest.spyOn(imagekitModule, 'uploadImageToImageKit').mockResolvedValue(targetUrl);

    const { container } = render(
      <ImageUploadField
        label="Hero Photo"
        value=""
        onChange={mockOnChange}
        folder="hero"
      />
    );

    const file = new File(['dummy-bytes'], 'avatar.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(targetUrl);
    });
  });

  test('displays error banner when upload fails', async () => {
    jest.spyOn(imagekitModule, 'uploadImageToImageKit').mockRejectedValue(
      new Error('ImageKit credentials missing')
    );

    const { container } = render(
      <ImageUploadField
        label="Cover Image"
        value=""
        onChange={jest.fn()}
      />
    );

    const file = new File(['dummy-bytes'], 'cover.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/ImageKit credentials missing/i)).toBeInTheDocument();
    });
  });
});
